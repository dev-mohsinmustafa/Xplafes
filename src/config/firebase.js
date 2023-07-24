// import { initializeApp } from 'firebase/app';
// import { getStorage,} from "firebase/storage";




// // or storage chayee
// // import "firebase/compat/storage";



// // agr or chezen use krni to wo yaha lagane jese ke authentication krne ho to

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyDF4pqIIVEnLB9ygMlfgm2Am7oUnq5cbGk",
//     authDomain: "womensafetyapp-eaeb2.firebaseapp.com",
//     projectId: "womensafetyapp-eaeb2",
//     storageBucket: "womensafetyapp-eaeb2.appspot.com",
//     messagingSenderId: "1035857805556",
//     appId: "1:1035857805556:web:27697254808eb90afbdea1"
// };

// const app = initializeApp(firebaseConfig);
// const storage = getStorage(app);




// // ye mobile pe likhne ka tariqa hota hai 
// // if (!firebase.apps.length) {
// //     initializeApp(firebaseConfig)
// // }

// // or bas es ko export kr de










import firebase from '@react-native-firebase/app';



const firebaseConfig = {
    apiKey: "AIzaSyDF4pqIIVEnLB9ygMlfgm2Am7oUnq5cbGk",
    authDomain: "womensafetyapp-eaeb2.firebaseapp.com",
    projectId: "womensafetyapp-eaeb2",
    storageBucket: "womensafetyapp-eaeb2.appspot.com",
    messagingSenderId: "1035857805556",
    appId: "1:1035857805556:web:27697254808eb90afbdea1",
    databaseURL: "https://console.firebase.google.com/u/0/project/womensafetyapp-eaeb2/database/womensafetyapp-eaeb2-default-rtdb/data/~2F"
};

// Check if Firebase is already initialized before initializing it again
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  









