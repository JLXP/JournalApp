import React, { useEffect, useState } from 'react'
import {Routes,Route } from 'react-router-dom'
import {firebase} from '../firebase/firebase-config'
import { useDispatch } from 'react-redux';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

import {JournalScreen} from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { login } from '../actions/auth';
import {  startLoadingNotes } from '../actions/notes';


export const AppRouter = () => {

  const dispatch = useDispatch();

  // SI ESTA AUTENTICADO MOSTRAR O ENTRAR A LA WEB que ya tengo TODO
  const [checking, setChecking] = useState(true);
 
  // ya esta autenticado
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  //Function para poder mantener el state de a aplicación
  useEffect(()=>{
        firebase.auth().onAuthStateChanged( async(user)=>{
          //Este if evalua si existe el uid
          if( user?.uid){
            dispatch( login( user.uid,user.displayName));
            setIsLoggedIn(true);
            dispatch( startLoadingNotes(user.uid));
          }else{
            
            setIsLoggedIn(false);
          }

          setChecking(false);

        });

  },[dispatch, setChecking, setIsLoggedIn]);



  if(checking){
    return(
      <div>Espere ...</div>
    )
  }
    
    //En el apartado de las routes se coloca el * para representar todas las routes
  return (
    <Routes>      
        <Route path="/auth/*" 
          element={
          <PublicRoute isAuth={isLoggedIn}>
            <AuthRouter/>
          </PublicRoute>}
        >
        </Route>

        <Route path="/" 
        element={
          <PrivateRoute isAuth={isLoggedIn}>
            <JournalScreen/>
          </PrivateRoute>}
        >
        </Route>       
        {
        //Lo que hace esta route es que cualquier ruta distinta se redirige al login
        }
    </Routes>
  )
}
