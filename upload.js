// I just realised HEIC images uploaded won't display in the preview

const stepsDiv = document.getElementById("steps");
let recipeData = { steps: [] };
let coverImage = null;

const coverInput = document.getElementById("cover-image");
const coverPreview = document.getElementById("cover-preview");

coverInput.onchange = () => {
    coverImage = coverInput.files[0];

    if (coverImage) {
        coverPreview.innerHTML = `<img src="${URL.createObjectURL(coverImage)}">`;
    }
};

// add step
document.getElementById("add-step").onclick = () => {
    const stepIndex = recipeData.steps.length;

    const stepImages = { images: [] };
    recipeData.steps.push(stepImages);

    const stepEl = document.createElement("div");
    stepEl.className = "step";

    stepEl.innerHTML = `
        <input class="step-name" placeholder="Step name (one word, no spaces)">
        <br>
        <textarea class="step-description" placeholder="Step description (explain the step)"></textarea>
        <br>
        <input type="file" class="step-images" multiple accept="image/*" capture="environment">
        <br>
        <br>
        <div class="image-list"></div>
    `;

    const fileInput = stepEl.querySelector(".step-images");
    const imageList = stepEl.querySelector(".image-list");

    fileInput.onchange = () => {
        stepImages.images = Array.from(fileInput.files);
        renderImages(imageList, stepImages);
    };

    stepsDiv.appendChild(stepEl);
}

// render images + drag to reorder
function renderImages(container, stepImages) {
    container.innerHTML = "";

    stepImages.images.forEach((file, index) => {
        const item = document.createElement("div");
        item.className = "image-item";

        const img = document.createElement("img");
        img.src = URL.createObjectURL(file);

        const number = document.createElement("div");
        number.className = "image-number";
        number.textContent = index + 1;

        item.appendChild(img);
        item.appendChild(number);
        container.appendChild(item);
    });

    new Sortable(container, {
        animation: 150,
        onEnd: (evt) => {
            const moved = stepImages.images.splice(evt.oldIndex, 1)[0];
            stepImages.images.splice(evt.newIndex, 0, moved);
            renderImages(container, stepImages);
        }
    });
}

// generate preview
document.getElementById("preview-btn").onclick = () => {
    const title = document.getElementById("title").value;
    const subtitle = document.getElementById("subtitle").value;
    const ingredients = document.getElementById("ingredients").value.split("\n");

    let html = `
        <h1>${title}</h1>
        <p class="subtitle">${subtitle}</p>
        ${coverImage ? `<img src="${URL.createObjectURL(coverImage)}" class="cover-img">` : ""}
        <br>
        <h2>Ingredients</h2>
        <ul>
            ${ingredients.map(i => `<li>${i}</li>`).join("\n")}
        </ul>
        <br>
        <h2>Steps</h2>
    `;

    document.querySelectorAll(".step").forEach((stepEl, i) => {
        const stepName = stepEl.querySelector(".step-name").value;
        const stepDescription = stepEl.querySelector(".step-description").value;
        const stepImages = recipeData.steps[i];

        html += `
            <p>${stepDescription}</p>
            <div class="horizontal-scroll-wrapper">
                <div class="horizontal-scroll">
                    ${stepImages.images.map(file => `<img src="${URL.createObjectURL(file)}">`).join("\n")}
                </div>
                <div class="horizontal-scroll-arrow left"><span class="arrow">▲</span></div>
                <div class="horizontal-scroll-arrow right"><span class="arrow">▲</span></div>
            </div>
        `;
    });

    document.getElementById("preview").innerHTML = html;
}

// download ZIP
document.getElementById("download-btn").onclick = async () => {
    const zip = new JSZip();

    const slug = document.getElementById("slug").value.trim().toLowerCase();
    const folder = zip.folder(`recipe_${slug}`);

    if (coverImage) {
        const ext = coverImage.name.split(".").pop();
        const filename = `${slug}_cover.${ext}`;
        folder.file(filename, coverImage);
    }

    document.querySelectorAll(".step").forEach((stepEl, i) => {
        const stepName = stepEl.querySelector(".step-name").value;
        const stepImages = recipeData.steps[i];
        stepImages.images.forEach((file, j) => {
            const ext = file.name.split(".").pop();
            const filename = `${slug}_${stepName}_${j + 1}.${ext}`;
            folder.file(filename, file);
        });
    });

    const title = document.getElementById("title").value;

    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>${title} | Cooking 👩‍🍳</title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="../styles.css">
            <link rel="icon" type="image/png" href="../assets/favicon.png">
        </head>
        <body>
            <header>
                <nav>
                    <a href="../index.html" class="site-title">Cooking 👩‍🍳</a>
                    <div class="nav-links">
                        <a href="../recipeindex.html">Recipe Index</a>
                    </div>
                </nav>
            </header>
            <main>
        `
    +   document.getElementById("preview").innerHTML
    +   `
                <br>
            </main>
            <footer>
                <p><i>Made with ❤ by <a href="https://github.com/faithlky">Faith</a> :-)</i></p>
            </footer>
            <script src="../script.js"></script>
        </body>
        </html>
    `;
    zip.file(`${slug}.html`, html);

    const blob = await zip.generateAsync({ type: "blob" });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${slug}.zip`;
    a.click();
}