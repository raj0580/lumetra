// This script handles all logic for the new, enhanced admin.html page.
document.addEventListener("DOMContentLoaded", () => {
    const loginView = document.getElementById('login-view');
    const dashboardView = document.getElementById('dashboard-view');
    if (!loginView || !dashboardView) return; // Stop if not on admin page

    // --- All Admin Forms & Elements ---
    const loginForm = document.getElementById('login-form');
    const logoutBtn = document.getElementById('logout-btn');
    
    // Service Elements
    const serviceForm = document.getElementById('service-form');
    const serviceIdField = document.getElementById('service-id');
    const serviceTitleField = document.getElementById('service-title');
    const serviceDescField = document.getElementById('service-description');
    const adminServicesList = document.getElementById('admin-services-list');
    
    // Project Elements
    const projectForm = document.getElementById('project-form');
    const projectIdField = document.getElementById('project-id');
    const projectTitleField = document.getElementById('project-title');
    const projectDescField = document.getElementById('project-description');
    const projectImgField = document.getElementById('project-image-url');
    const projectCategorySelect = document.getElementById('project-category');
    const adminProjectsList = document.getElementById('admin-projects-list');

    // --- AUTHENTICATION ---
    onAuthChange(user => {
        if (user) {
            loginView.style.display = 'none';
            dashboardView.style.display = 'block';
            loadAllAdminData(); // Load everything once logged in
        } else {
            loginView.style.display = 'block';
            dashboardView.style.display = 'none';
        }
    });
    loginForm.addEventListener('submit', e => { e.preventDefault(); signIn(loginForm['login-email'].value, loginForm['login-password'].value).catch(err => alert(err.message)); });
    logoutBtn.addEventListener('click', () => signOutUser());

    // --- DATA LOADING ---
    function loadAllAdminData() {
        loadAdminServices();
        loadAdminProjects();
    }
    
    // --- SERVICES MANAGEMENT ---
    async function loadAdminServices() {
        const services = await getServices();
        adminServicesList.innerHTML = '';
        projectCategorySelect.innerHTML = '<option value="">-- Select a Category --</option>'; // Reset dropdown

        services.forEach(service => {
            // Populate services list
            const item = document.createElement('div');
            item.className = 'admin-item';
            item.innerHTML = `<p>${service.title}</p><div><button class="btn btn-secondary edit-btn">Edit</button><button class="btn btn-danger delete-btn">Delete</button></div>`;
            item.querySelector('.edit-btn').addEventListener('click', () => populateServiceForm(service));
            item.querySelector('.delete-btn').addEventListener('click', () => deleteServiceHandler(service.id, service.title));
            adminServicesList.appendChild(item);

            // Populate project category dropdown
            const option = document.createElement('option');
            option.value = service.title;
            option.textContent = service.title;
            projectCategorySelect.appendChild(option);
        });
    }

    function populateServiceForm(service) {
        serviceIdField.value = service.id;
        serviceTitleField.value = service.title;
        serviceDescField.value = service.description;
        serviceForm.scrollIntoView({ behavior: 'smooth' });
    }

    serviceForm.addEventListener('submit', async e => {
        e.preventDefault();
        const data = { title: serviceTitleField.value, description: serviceDescField.value };
        const id = serviceIdField.value;
        try {
            if (id) { await updateService(id, data); } else { await addService(data); }
            alert('Service saved!');
            serviceForm.reset();
            serviceIdField.value = '';
            loadAdminServices(); // Refresh list and dropdown
        } catch (err) { alert(err.message); }
    });

    async function deleteServiceHandler(id, title) {
        if (confirm(`Are you sure you want to delete the "${title}" service? This cannot be undone.`)) {
            try { await deleteService(id); alert('Service deleted.'); loadAdminServices(); } catch (err) { alert(err.message); }
        }
    }
    
    // --- PROJECTS MANAGEMENT ---
    async function loadAdminProjects() {
        const projects = await getProjects();
        adminProjectsList.innerHTML = '';
        projects.forEach(project => {
            const item = document.createElement('div');
            item.className = 'admin-item';
            item.innerHTML = `<p>${project.title} <small><em>(Category: ${project.category || 'None'})</em></small></p><div><button class="btn btn-secondary edit-btn">Edit</button><button class="btn btn-danger delete-btn">Delete</button></div>`;
            item.querySelector('.edit-btn').addEventListener('click', () => populateProjectForm(project));
            item.querySelector('.delete-btn').addEventListener('click', () => deleteProjectHandler(project.id, project.title));
            adminProjectsList.appendChild(item);
        });
    }

    function populateProjectForm(project) {
        projectIdField.value = project.id;
        projectTitleField.value = project.title;
        projectDescField.value = project.description;
        projectImgField.value = project.imageUrl;
        projectCategorySelect.value = project.category; // Set the dropdown
        projectForm.scrollIntoView({ behavior: 'smooth' });
    }

    projectForm.addEventListener('submit', async e => {
        e.preventDefault();
        const data = { title: projectTitleField.value, description: projectDescField.value, imageUrl: projectImgField.value, category: projectCategorySelect.value };
        if (!data.category) { alert('Please select a category for the project.'); return; }
        const id = projectIdField.value;
        try {
            if (id) { await updateProject(id, data); } else { await addProject(data); }
            alert('Project saved!');
            projectForm.reset();
            projectIdField.value = '';
            loadAdminProjects();
        } catch (err) { alert(err.message); }
    });

    async function deleteProjectHandler(id, title) {
        if (confirm(`Are you sure you want to delete the project "${title}"?`)) {
            try { await deleteProject(id); alert('Project deleted.'); loadAdminProjects(); } catch (err) { alert(err.message); }
        }
    }
});
