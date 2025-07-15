// This script handles all logic for the admin.html page.

document.addEventListener("DOMContentLoaded", () => {
    const loginView = document.getElementById('login-view');
    const dashboardView = document.getElementById('dashboard-view');
    const loginForm = document.getElementById('login-form');
    const logoutBtn = document.getElementById('logout-btn');
    const projectForm = document.getElementById('project-form');
    const adminProjectsList = document.getElementById('admin-projects-list');

    // --- AUTHENTICATION ---

    // Handle login form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        signIn(email, password)
            .catch(error => alert(`Login Failed: ${error.message}`));
    });

    // Handle logout
    logoutBtn.addEventListener('click', () => {
        signOutUser().catch(error => alert(`Logout Failed: ${error.message}`));
    });

    // Listen for auth state changes to show/hide views
    onAuthChange(user => {
        if (user) {
            // User is signed in
            loginView.style.display = 'none';
            dashboardView.style.display = 'block';
            loadAdminProjects(); // Load projects once logged in
        } else {
            // User is signed out
            loginView.style.display = 'block';
            dashboardView.style.display = 'none';
        }
    });

    // --- CRUD OPERATIONS ---

    // Handle project form submission (Add & Edit)
    projectForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const projectId = document.getElementById('project-id').value;
        const title = document.getElementById('project-title').value;
        const description = document.getElementById('project-description').value;
        const imageUrl = document.getElementById('project-image-url').value;

        const projectData = { title, description, imageUrl };

        try {
            if (projectId) {
                // Update existing project
                await updateProject(projectId, projectData);
                alert('Project updated successfully!');
            } else {
                // Add new project
                await addProject(projectData);
                alert('Project added successfully!');
            }
            projectForm.reset();
            loadAdminProjects(); // Refresh the list
        } catch (error) {
            alert(`Error saving project: ${error.message}`);
        }
    });

    // Function to load and display projects in the admin list
    const loadAdminProjects = async () => {
        try {
            const projects = await getProjects();
            adminProjectsList.innerHTML = ''; // Clear list

            projects.forEach(project => {
                const item = document.createElement('div');
                item.className = 'admin-project-item';
                item.innerHTML = `
                    <span>${project.title}</span>
                    <div>
                        <button class="btn btn-secondary edit-btn">Edit</button>
                        <button class="btn btn-danger delete-btn">Delete</button>
                    </div>
                `;

                // Add event listener for delete button
                item.querySelector('.delete-btn').addEventListener('click', async () => {
                    if (confirm('Are you sure you want to delete this project?')) {
                        await deleteProject(project.id);
                        loadAdminProjects();
                    }
                });

                // Add event listener for edit button
                item.querySelector('.edit-btn').addEventListener('click', () => {
                    // Populate form with project data
                    document.getElementById('project-id').value = project.id;
                    document.getElementById('project-title').value = project.title;
                    document.getElementById('project-description').value = project.description;
                    document.getElementById('project-image-url').value = project.imageUrl;
                    window.scrollTo(0, projectForm.offsetTop); // Scroll to form
                });

                adminProjectsList.appendChild(item);
            });
        } catch (error) {
            adminProjectsList.innerHTML = `<p>Error loading projects: ${error.message}</p>`;
        }
    };
});