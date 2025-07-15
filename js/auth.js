// This file handles all Firebase authentication interactions.

// Get a reference to the Firebase auth service
const auth = firebase.auth();

/**
 * Signs in a user with email and password.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<UserCredential>} A promise that resolves with user credentials.
 */
const signIn = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
};

/**
 * Signs out the current user.
 * @returns {Promise} A promise that resolves when the user is signed out.
 */
const signOutUser = () => {
    return auth.signOut();
};

/**
 * Listens for changes in the authentication state.
 * @param {Function} callback - A function to call with the user object when state changes.
 */
const onAuthChange = (callback) => {
    return auth.onAuthStateChanged(callback);
};