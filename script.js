function layoutImageRow() {
    const containers = document.querySelectorAll(".images-in-a-row");
    
    containers.forEach(container => {
        const images = container.querySelectorAll("img");

        const containerWidth = container.clientWidth;

        const style = getComputedStyle(container);
        const gap = parseFloat(style.gap);
        const totalGap = gap * (images.length - 1);

        let aspectRatioSum = 0;

        images.forEach(img => {
            const ratio = img.naturalWidth / img.naturalHeight;
            aspectRatioSum += ratio;
        });

        const rowHeight = (containerWidth - totalGap) / aspectRatioSum;
        
        images.forEach(img => {
            const ratio = img.naturalWidth / img.naturalHeight;
            img.style.width = `${rowHeight * ratio}px`;
            img.style.height = `${rowHeight}px`;
        });
    });
}

window.addEventListener("load", layoutImageRow);
window.addEventListener("resize", layoutImageRow);