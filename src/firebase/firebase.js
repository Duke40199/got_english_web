import firebase from 'firebase'
import "firebase/auth";
import "firebase/firestore";
//import util from 'util';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB0l31PMIfIMgDceOjlcOimsHUFSccvzjU",
    authDomain: "gotenglish-app.firebaseapp.com",
    projectId: "gotenglish-app",
    storageBucket: "gotenglish-app.appspot.com",
    messagingSenderId: "392616753385",
    appId: "1:392616753385:web:cf70a3478c6f8ea51d5878",
    measurementId: "G-T0K0LB12VF"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
firebase.analytics();

export const signInWithEmailAndPasswordHandler = async (email, password) => {
    var idToken
    await auth.signInWithEmailAndPassword(email, password).catch(error => {
        console.error("Error signing in with password and email", error);
    }).then(async (userCredential) => {
        if (userCredential !== undefined) {
            var firebaseUser = userCredential.user;
            idToken = await firebaseUser.getIdTokenResult(false);
        }
    });
    return idToken
};

export const sendResetPasswordEmail = async (email) => {
    let result = false;
    const onSuccess = response => {
        result = true;
    }

    const onFailure = error => {
        console.log(error);
    }

    await auth.sendPasswordResetEmail(email)
        .then(onSuccess)
        .catch(onFailure)

    return result;
}

export default firebase