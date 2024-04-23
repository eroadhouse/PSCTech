console.log('hello from index.js')

import {
    hideLoginError,
    showLoginState,
    showLoginForm,
    showApp,
    showLoginError,
    btnLogin,
    btnSignup,
    btnLogout,
    txtPassword,
    lblAuthState
} from './ui'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const app = initializeApp({
  apiKey: "AIzaSyCgH9WIL3GvGL5_jS8XJWnQJUQ45yLOqCA",
  authDomain: "psctech-9ede2.firebaseapp.com",
  projectId: "psctech-9ede2",
  storageBucket: "psctech-9ede2.appspot.com",
  messagingSenderId: "12374190264",
  appId: "1:12374190264:web:7c2a0dd4842574a4ecac4d",
  measurementId: "G-PBRQM4R20C",
  databaseURL: "https://psctech-9ede2-default-rtdb.firebaseio.com/"
});

// Initialize Firebase
const analytics = getAnalytics(app);
// Initialize variables
const auth = getAuth(app);
//connectAuthEmulator(auth, "http://localhost:9099");
const database = getDatabase(app);

const loginEmailPassword = async () => {
    const loginEmail = txtEmail.value;
    const loginPassword = txtPassword.value;

    try {
    const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    console.log(userCredential.user);
    } catch (error) {
        console.log(error);
        showLoginError(error);
    }
    
}

btnLogin.addEventListener("click", loginEmailPassword);

const createAccount = async () => {
    const loginEmail = txtEmail.value;
    const loginPassword = txtPassword.value;

    try {
    const userCredential = await createUserWithEmailAndPassword(auth, loginEmail, loginPassword);
    console.log(userCredential.user);
    } catch (error) {
        console.log(error);
        showLoginError(error);
    }
}

btnSignup.addEventListener("click", createAccount);

const monitorAuthState = async () => {
    onAuthStateChanged(auth, user => {
        if (user) {
            console.log(user);
            showApp();
            showLoginState(user);
            hideLoginError();
        } else {
            showLoginForm();
            lblAuthState.innerHTML = "You're not logged in.";
        }
    });
}

monitorAuthState();

const logout = async () => {
    await signOut(auth);
}

btnLogout.addEventListener("click", logout);

/*


function validateEmail(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/;
    if (expression.test(email) == true) {
        return true;
    } else {
        return false;
    }
}

function validatePassword(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
        return false;
    } else {
        return true;
    }
}

/*function validateField(field) {
    if (field == null) {
        return false;
    }
    if (field.length <= 0) {
        return false;
    } else {
        return true;
    }
}

document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();
    console.log(app)
});

function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)

        .then(result => {
            const user = result.user;
            document.write(`Signed in as ${user.displayName}`);
            console.log()
        })
        .catch(console.log)
}*/
