// This script dynamically loads the header and footer into placeholders.

document.addEventListener("DOMContentLoaded", function() {
    // Function to fetch and insert HTML content
    const loadComponent = (url, placeholderId) => {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById(placeholderId).innerHTML = data;
            })
            .catch(error => console.error(`Error loading ${url}:`, error));
    };

    // Load header and footer
    loadComponent('components/header.html', 'header-placeholder');
    loadComponent('components/footer.html', 'footer-placeholder');
});