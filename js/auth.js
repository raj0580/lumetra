// This file handles all Firebase authentication interactions.
const auth = firebase.auth();

function signIn(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
}

function signOutUser() {
    return auth.signOut();
}

function onAuthChange(callback) {
    return auth.onAuthStateChanged(callback);
}
