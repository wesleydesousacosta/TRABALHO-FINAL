const searchInput = document.getElementById('searchInput');
    const cards = document.querySelectorAll('.card');

    searchInput.addEventListener('input', function() {
        const filter = searchInput.value.toLowerCase();

        cards.forEach(card => {
            const title = card.querySelector('h1').textContent.toLowerCase();
            if (title.includes(filter)) {
                card.style.display = ''; 
                card.classList.add('highlight'); 
            } else {
                card.style.display = 'none'; 
                card.classList.remove('highlight'); 
            }
        });
    });