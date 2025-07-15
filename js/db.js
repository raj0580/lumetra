// This file handles all Firestore database interactions.

// Get a reference to the Firestore service
const db = firebase.firestore();
const projectsCollection = db.collection("projects");
const messagesCollection = db.collection("messages");

/**
 * Fetches all projects from Firestore, ordered by creation time.
 * @returns {Promise<Array>} A promise that resolves to an array of project objects.
 */
const getProjects = async () => {
    const snapshot = await projectsCollection.orderBy("createdAt", "desc").get();
    const projects = [];
    snapshot.forEach(doc => {
        projects.push({ id: doc.id, ...doc.data() });
    });
    return projects;
};

/**
 * Adds a new project to Firestore.
 * @param {Object} projectData - The data for the new project.
 * @returns {Promise} A promise that resolves when the project is added.
 */
const addProject = (projectData) => {
    return projectsCollection.add({
        ...projectData,
        createdAt: firebase.firestore.FieldValue.serverTimestamp() // Adds a server-side timestamp
    });
};

/**
 * Updates an existing project in Firestore.
 * @param {string} id - The ID of the project to update.
 * @param {Object} updatedData - The new data for the project.
 * @returns {Promise} A promise that resolves when the project is updated.
 */
const updateProject = (id, updatedData) => {
    return projectsCollection.doc(id).update(updatedData);
};

/**
 * Deletes a project from Firestore.
 * @param {string} id - The ID of the project to delete.
 * @returns {Promise} A promise that resolves when the project is deleted.
 */
const deleteProject = (id) => {
    return projectsCollection.doc(id).delete();
};

/**
 * Saves a new contact message to the 'messages' collection in Firestore.
 * @param {Object} messageData - The contact message data (e.g., { name, email, message }).
 * @returns {Promise} A promise that resolves when the message is saved.
 */
const saveContactMessage = (messageData) => {
    return messagesCollection.add({
        ...messageData,
        receivedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
};