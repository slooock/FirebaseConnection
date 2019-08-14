import app from 'firebase/app';
import "firebase/firestore";
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBMI3lPlHlLpljdhoL_wkOD6bqc6CJ-hYI",
    authDomain: "reactbootstrap.firebaseapp.com",
    databaseURL: "https://reactbootstrap.firebaseio.com",
    projectId: "reactbootstrap",
    storageBucket: "",
    messagingSenderId: "68657468880",
    appId: "1:68657468880:web:e471bba9b7aa448a"
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.firestore();
    }
    // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);


    registerEmployee = (name, email, phone) => this.db.collection("users").add({
        name: name,
        email: email,
        phone: phone
    })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
    
    arroz = () => this.db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data().name}`);
        });
    });


}

export default Firebase;