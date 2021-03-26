import firebase from 'firebase'

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
firebase.analytics();

export default firebase