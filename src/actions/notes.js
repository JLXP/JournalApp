import Swal from 'sweetalert2';
import { types } from "../types/types";
import { db } from "../firebase/firebase-config";
import { loadNotes } from "../helpers/loadNotes";
import { fileUpload } from '../helpers/fileUpload';
import { traverseTwoPhase } from 'react-dom/cjs/react-dom-test-utils.production.min';


export const startNewNote = () =>{
    return async(dispatch,getState)=>{

        const { uid } = getState().auth;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${ uid }/journal/notes`).add(newNote);
        
        dispatch(activeNote(doc.id, newNote)); 
        dispatch( addNewNote( doc.id, newNote));
        
    }
}

export const activeNote = (id, note)=>({
    type:types.notesActive,
    payload:{
        id,
        ...note
    }
});

//Ejecuta la busqueda de las notes que se guardan en firebase
export const startLoadingNotes = (uid) =>{
    return async (dispatch) =>{
        const notes = await loadNotes(uid);
        dispatch( setNotes(notes) );
    }
}


//Action que recibe todo el argumento
export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
});

export const startSaveNote = ( note ) =>{
    
    return async(dispatch, getState) => {

        const { uid } = getState().auth;

        if(!note.url){
            delete note.url;
        }

        const noteFirestore = { ...note };
        //Esto se hace con el fin de evitar el id
        // no lo necesita la base de datos de firebase
        delete noteFirestore.id;

        await db.doc(`${ uid }/journal/notes/${ note.id }`).update( noteFirestore);

        dispatch(refreshNote(note.id, noteFirestore));
        Swal.fire('Saved',note.title,'success');

        

    }
}

export const refreshNote = (id, note)=>({
    type: types.notesUpdated,
    payload: {
        id,
        note:{
            id,
            ...note
        }
    }
});

export const startUploading = (file) =>{
    return async(dispatch,getState)=>{
        //obtiene el estado de la nota actual
        const {active:activeNote}= getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text:'Please wait...',
            allowOutsideClick:false, 
            showConfirmButton: false,
            willOpen:() => {
                Swal.showLoading();
            }
        })

        const fileUrl= await fileUpload(file);
        activeNote.url = fileUrl;

        dispatch( startSaveNote(activeNote));
        
        Swal.close();
    }
}

export const startDeleting = ( id ) => {
    return async( dispatch,getState )=>{
        //Obtiene el id del usuario que se encuentra registrado
        const uid = getState().auth.uid;
        //el id es de la note que se va a eliminar
        await db.doc(`${uid}/journal/notes/${id}`).delete();

        dispatch(deleteNote(uid));


    }
}

export const deleteNote = (id) =>({
    type: types.notesDelete,
    payload:id
});

export const noteLogout= () =>({
    type: types.notesLogoutCleaning,
});

export const addNewNote = (id, note) =>({
    types: types.notesAddNew,
    payload: {id,...note}
});