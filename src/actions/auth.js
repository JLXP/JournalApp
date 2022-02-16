import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { types } from "../types/types";

export const startLoginEmailPassword = (email, password) => {
    //callback
    return ( dispatch ) => {
        setTimeout(() => {
            dispatch( login(123,'Pedro'));
        }, 3500);
    }
}

export const startRegisterWithEmailPasswordName = (email, password, name) =>{
    return ( dispatch ) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then( async({user})=>{
             await user.updateProfile({display: name});
        });
    }
}

export const startGoogleLogin = () =>{
    return ( dispatch ) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
        .then(({user})=>{
            dispatch(login(user.uid,user.displayName))
        });
    }
}

export const login = (uid,displayname) => {
    return{
        type: types.login,
        payload:{
            uid,
            displayname
        }
    }
}