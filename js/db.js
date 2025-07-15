// This file handles all Firestore database interactions.

const db = firebase.firestore();
const projectsCollection = db.collection("projects");
const messagesCollection = db.collection("messages");

async function getProjects() {
    const snapshot = await projectsCollection.orderBy("createdAt", "desc").get();
    const projects = [];
    snapshot.forEach(doc => {
        projects.push({ id: doc.id, ...doc.data() });
    });
    return projects;
}

function addProject(projectData) {
    return projectsCollection.add({
        ...projectData,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
}

function updateProject(id, updatedData) {
    return projectsCollection.doc(id).update(updatedData);
}

function deleteProject(id) {
    return projectsCollection.doc(id).delete();
}

function saveContactMessage(messageData) {
    return messagesCollection.add({
        ...messageData,
        receivedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
}
