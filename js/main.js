// This script handles functionality for the public-facing pages, like fetching projects and animations.

document.addEventListener("DOMContentLoaded", () => {
    
    // --- PROJECTS LOADING ---
    const projectsGrid = document.getElementById('projects-grid');

    if (projectsGrid) {
        getProjects()
            .then(projects => {
                if (projects.length === 0) {
                    projectsGrid.innerHTML = "<p>No projects to display yet. Check back soon!</p>";
                    return;
                }

                projectsGrid.innerHTML = ''; // Clear the 'Loading...' message
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
                    projectsGrid.appendChild(projectCard);
                });
            })
            .catch(error => {
                console.error("Error fetching projects: ", error);
                projectsGrid.innerHTML = "<p>Could not load projects at this time.</p>";
            });
    }

    // --- FADE-IN ANIMATION ON SCROLL ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach(section => {
        observer.observe(section);
    });

});