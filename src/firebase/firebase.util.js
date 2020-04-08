import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';

const config = 
{
    apiKey: "AIzaSyC4sKsfB3lJ9kK1un-XsFy1Q_QDkWl57Sk",
    authDomain: "crwn-db-8df89.firebaseapp.com",
    databaseURL: "https://crwn-db-8df89.firebaseio.com",
    projectId: "crwn-db-8df89",
    storageBucket: "crwn-db-8df89.appspot.com",
    messagingSenderId: "844062566754",
    appId: "1:844062566754:web:7cd0b2a122d63fabb0243b",
    measurementId: "G-L7XPP04BB7"
};

//we are initializing the key/settings that we got from firebase web in our project settings
firebase.initializeApp(config);

//we are exporting the auth we importing up top
export const auth = firebase.auth();

export const firestore = firebase.firestore();

//setting up google OAuth for logging in with google 
const provider = new firebase.auth.GoogleAuthProvider();

//Here we are always setting it to trigger google popup to show all the accounts
provider.setCustomParameters({prompt: 'select_account'});

//Setting up login
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;