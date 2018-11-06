import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyDcXcM0A1R0mVdh5Q28qBPhvr6UDElM9q0",
    authDomain: "midtermproject-185f8.firebaseapp.com",
    databaseURL: "https://midtermproject-185f8.firebaseio.com",
    projectId: "midtermproject-185f8",
    storageBucket: "midtermproject-185f8.appspot.com",
    messagingSenderId: "146943006842"
};

firebase.initializeApp(config);

const database = firebase.database().ref();
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
