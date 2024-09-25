function search() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const sections = document.querySelectorAll("section");
    let found = false;

    sections.forEach(section => {
        const title = section.querySelector("h2").textContent.toLowerCase();
        if (title.includes(input)) {
            section.scrollIntoView({ behavior: "smooth" });
            found = true;
        }
    });

    if (!found) {
        alert("Seção não encontrada.");
    }
}