// This script handles functionality for the public-facing pages.
document.addEventListener("DOMContentLoaded", () => {
    
    // --- DYNAMIC CONTENT LOADING ---
    const servicesGrid = document.getElementById('services-grid');
    const projectsGrid = document.getElementById('projects-grid');
    const portfolioGrid = document.getElementById('portfolio-projects-grid');
    const portfolioTitle = document.getElementById('portfolio-title');
    const portfolioSubtitle = document.getElementById('portfolio-subtitle');

    // Load Services on the homepage
    if (servicesGrid) {
        getServices().then(services => {
            if (services.length === 0) {
                servicesGrid.innerHTML = "<p>Services will be listed here soon.</p>";
                return;
            }
            servicesGrid.innerHTML = '';
            services.forEach(service => {
                // Create a clickable link for each service card
                const serviceLink = document.createElement('a');
                serviceLink.href = `portfolio.html?category=${encodeURIComponent(service.title)}`;
                serviceLink.className = 'service-card';
                serviceLink.innerHTML = `
                    <h3>${service.title}</h3>
                    <p>${service.description}</p>
                `;
                servicesGrid.appendChild(serviceLink);
            });
        });
    }

    // Function to display projects on any grid
    const displayProjects = (gridElement, category = null) => {
        if (!gridElement) return;

        getProjects(category).then(projects => {
            if (projects.length === 0) {
                gridElement.innerHTML = `<p>No projects found in this category yet. Check back soon!</p>`;
                if (category) { // Update portfolio title if filtering
                    portfolioTitle.textContent = category;
                    portfolioSubtitle.textContent = `A showcase of our work in ${category}.`;
                }
                return;
            }
            gridElement.innerHTML = '';
            projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                projectCard.innerHTML = `
                    <img src="${project.imageUrl}" alt="${project.title}">
                    <div class="project-card-content">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                    </div>
                `;
                gridElement.appendChild(projectCard);
            });
        });
    };

    // Load projects on the homepage (latest 3)
    if (projectsGrid) {
        getProjects().then(allProjects => displayProjects(projectsGrid, null, allProjects.slice(0, 3)));
    }

    // Load projects on the portfolio page (with filtering)
    if (portfolioGrid) {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        displayProjects(portfolioGrid, category);
    }

    // --- FADE-IN ANIMATION ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in-section').forEach(section => observer.observe(section));
});
