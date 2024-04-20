// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgH9WIL3GvGL5_jS8XJWnQJUQ45yLOqCA",
  authDomain: "psctech-9ede2.firebaseapp.com",
  projectId: "psctech-9ede2",
  storageBucket: "psctech-9ede2.appspot.com",
  messagingSenderId: "12374190264",
  appId: "1:12374190264:web:7c2a0dd4842574a4ecac4d",
  measurementId: "G-PBRQM4R20C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize variables
const auth = firebase.auth();
const database = firebase.database();

// TODO: This will need to be moved from this page to admin-only
function register() {
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;

    // Validate input fields
    if (validateEmail(email) == false || validatePassword(password) == false) {
        alert('Incorrect Email or Password. Please try again.');
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
        // Declare user variable
        var user = auth.currentUser;
        // Add this user to Firebase database
        var databaseRef = database.ref();

        var userData = {
            email : email,
            lastLogin : Date.now()
        }

        // Push to database
        databaseRef.child('users/' + user.uid).set(userData);

        alert('User created');
    })
    .catch(function(error) {
        // Firebase will use this to alert its errors
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
    })
}

// login function
function login() {
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;

    // Validate input fields
    if (validateEmail(email) == false || validatePassword(password) == false) {
        alert('Incorrect Email or Password. Please try again.');
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
        // Declare user variable
        var user = auth.currentUser;
        // Add this user to Firebase database
        var databaseRef = database.ref();

        var userData = {
            lastLogin : Date.now()
        }

        // Push to database
        databaseRef.child('users/' + user.uid).update(userData);

        alert('User logged');
    })
    .catch(function(error) {
        // Firebase will use this to alert its errors
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
    })
}

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
}*/

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
}