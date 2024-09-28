document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const searchInput = document.getElementById('search');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting
        console.log(searchInput.value);
    });
});