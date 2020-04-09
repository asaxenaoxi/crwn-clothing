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

export const createUserProfileDocument = async (userAuthObj, additionalUserData) =>
{
    if(!userAuthObj)
    {
        console.log("userAuthObj provided by firebase::auth is null");
        return;
    }

    console.log("Fetching queryRef for userAuthObj(id) = ", userAuthObj.uid);
    //const userRef = firestore.collection('users').doc(`${userAuthObj.uid}`); <=this and below mean the same thing
    const userQueryRef = firestore.doc(`users/${userAuthObj.uid}`);

    //await is used in any async function calls
    const userQuerySnapshot = await userQueryRef.get();
    
    //exists is a property inside the snapshot object which tells if there was data at that location or not
    if(!userQuerySnapshot.exists)
    {
        const {displayName, email} = userAuthObj;
        const createdAt = new Date();

        try
        {
            //this function asynchronously creates the data in the document referenced above.
            console.log("User(", displayName, ") doesnt exist in firestore, adding data to document(", userAuthObj.uid, ") = ");
            await userQueryRef.set({
            displayName,
            email, 
            createdAt,
            ...additionalUserData
            });
        }
        catch(error)
        {
            console.log("Error while creating user: ", error.message);
        }
    }

    //If data doesnt exist, we create it above, else if it does then we just return the ref, in all cases we return the ref
    return userQueryRef;
}

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