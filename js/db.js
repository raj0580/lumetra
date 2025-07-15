// This file handles all Firestore database interactions.
const db = firebase.firestore();
const projectsCollection = db.collection("projects");
const servicesCollection = db.collection("services");

/**
 * Fetches projects. Can be filtered by category.
 * @param {string|null} category - The category to filter by. If null, fetches all projects.
 * @returns {Promise<Array>} A promise that resolves to an array of project objects.
 */
async function getProjects(category = null) {
    let query = projectsCollection.orderBy("createdAt", "desc");
    if (category) {
        query = query.where("category", "==", category);
    }
    const snapshot = await query.get();
    const projects = [];
    snapshot.forEach(doc => {
        projects.push({ id: doc.id, ...doc.data() });
    });
    return projects;
}

// --- PROJECT CRUD ---
function addProject(projectData) { return projectsCollection.add({ ...projectData, createdAt: firebase.firestore.FieldValue.serverTimestamp() }); }
function updateProject(id, updatedData) { return projectsCollection.doc(id).update(updatedData); }
function deleteProject(id) { return projectsCollection.doc(id).delete(); }

/**
 * Fetches all services from Firestore.
 * @returns {Promise<Array>} A promise that resolves to an array of service objects.
 */
async function getServices() {
    const snapshot = await servicesCollection.orderBy("title").get();
    const services = [];
    snapshot.forEach(doc => {
        services.push({ id: doc.id, ...doc.data() });
    });
    return services;
}

// --- SERVICE CRUD ---
function addService(serviceData) { return servicesCollection.add(serviceData); }
function updateService(id, updatedData) { return servicesCollection.doc(id).update(updatedData); }
function deleteService(id) { return servicesCollection.doc(id).delete(); }
