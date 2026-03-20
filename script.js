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

function updateScrollUI() {
    document.querySelectorAll(".horizontal-scroll-wrapper").forEach(wrapper => {
        const scroll = wrapper.querySelector(".horizontal-scroll");
        if (!scroll) return;
        const isOverflowing = scroll.scrollWidth > scroll.clientWidth;
        const isAtStart = scroll.scrollLeft <= 0;
        const isAtEnd = scroll.scrollLeft + scroll.clientWidth >= scroll.scrollWidth - 1;
        wrapper.classList.toggle("at-start", isAtStart);
        wrapper.classList.toggle("at-end", isAtEnd);
        wrapper.classList.toggle("scrolled", !isAtStart);
        wrapper.classList.toggle("is-overflowing", isOverflowing);
    });
}

window.addEventListener("load", () => {
    layoutImageRow();
    updateScrollUI();
});

window.addEventListener("resize", () => {
    layoutImageRow();
    updateScrollUI();
});

document.querySelectorAll(".horizontal-scroll").forEach(el => {
    el.addEventListener("scroll", updateScrollUI);
});