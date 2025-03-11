document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".slide-in");
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.animationDelay = `${index * 0.3}s`;
            el.classList.add("animated");
        }, 200);
    });
});