import app from "firebase/app";
import "firebase/auth";

require("dotenv");

// const config = {
//     apiKey: process.env.FIREBASE_API_KEY,
//     authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//     databaseURL: process.env.FIREBASE_DATABASE_URL,
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     storageBucket: process.env.FIREBASE_STORAGE_BUCKET, 
//     messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
// };

const config = {
    apiKey: "AIzaSyBsEGPSAlpX3FV8YD-rD1LIBcpcZK_GL-Q",
    authDomain: "ams-icists-182409.firebaseapp.com",
    databaseURL: "https://ams-icists-182409.firebaseio.com",
    projectId: "ams-icists-182409",
    storageBucket: "ams-icists-182409.appspot.com",
    messagingSenderId: "650198246298"
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
    }

    doCreateUserWithEmailAndPassword = (email, password) => {
        this.auth.createUserWithEmailAndPassword(email, password);
    }

    doSignInWithEmailAndPassword = (email, password) => {
        this.auth.signInWithEmailAndPassword(email, password);
    }

    doSignOut = () => this.auth.signOut();

    doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = (password) => this.auth.currentUser.updatePassword(password);
}

export default Firebase;