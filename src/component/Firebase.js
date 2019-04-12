import * as firebase from 'firebase';

const setting={};

var config = {
    apiKey: "AIzaSyDpb7h5JBgnydu6-frGOthJLbR32Arc2yE",
    authDomain: "beta-ecom.firebaseapp.com",
    databaseURL: "https://beta-ecom.firebaseio.com",
    projectId: "beta-ecom",
    storageBucket: "beta-ecom.appspot.com",
    messagingSenderId: "567196113136"
};
firebase.initializeApp(config);
const auth=firebase.auth();
firebase.firestore().settings(setting);

const userSession = (action,email,password)=>auth[`${action}WithEmailAndPassword`](email,password);

const logout=()=>auth.signOut();
export default firebase;
export {userSession,logout}