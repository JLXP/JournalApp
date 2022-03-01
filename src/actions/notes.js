import { types } from "../types/types";
import { db } from "../firebase/firebase-config";
import { loadNotes } from "../helpers/loadNotes";

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

    }
}