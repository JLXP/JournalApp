import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDh2bCe4XtZ7NvtIGKa0hpClkVxY62FNiw",
    authDomain: "react-app-cursos-8b037.firebaseapp.com",
    projectId: "react-app-cursos-8b037",
    storageBucket: "react-app-cursos-8b037.appspot.com",
    messagingSenderId: "849325740469",
    appId: "1:849325740469:web:d5e7dcac5482754ffb09fc",
    measurementId: "G-FJK5KC9R1Z"
  };

 firebase.initializeApp(firebaseConfig);

 //conexion a base de datos
 const db = firebase.firestore();

 //Conexión a google
 const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

 export {
     db,
     googleAuthProvider,
     firebase
 }