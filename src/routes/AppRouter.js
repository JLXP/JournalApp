import React from 'react'
import {Routes,Route, Navigate } from 'react-router-dom'

import {JournalScreen} from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';

export const AppRouter = () => {
    
    //En el apartado de las routes se coloca el * para representar todas las routes
  return (
    <Routes>
        
        <Route path="/auth/*" element={<AuthRouter/>}></Route>
        <Route path="/" element={<JournalScreen/>}></Route>       
        {
        //Lo que hace esta route es que cualquier ruta distinta se redirige al login
        }
         

    </Routes>
  )
}
