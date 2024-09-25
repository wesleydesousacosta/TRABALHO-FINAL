const Horizontal1 = document.querySelector(".Horizontal1");

let isDragging = false;
let startX; 
let scrollLeft; 
// Função chamada quando o usuário começa a arrastar (mousedown).
const dragStart = (e) => {
    isDragging = true;
    Horizontal1.classList.add("dragging");
    startX = e.pageX - Horizontal1.offsetLeft;
    scrollLeft = Horizontal1.scrollLeft;
}
// Função chamada enquanto o usuário arrasta o mouse (mousemove).
const dragging = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - Horizontal1.offsetLeft;
    const walk = (x - startX);
    Horizontal1.scrollLeft = scrollLeft - walk;
}
// usuário solta o mouse (mouseup) ou sai do elemento (mouseleave).
const dragEnd = () => {
    isDragging = false;
    Horizontal1.classList.remove("dragging");
}

Horizontal1.addEventListener("mousedown", dragStart);
Horizontal1.addEventListener("mousemove", dragging);
Horizontal1.addEventListener("mouseup", dragEnd);
Horizontal1.addEventListener("mouseleave", dragEnd);
