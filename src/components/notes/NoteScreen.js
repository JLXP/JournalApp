import React, {useEffect,useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { NoteAppBar } from './NoteAppBar';
import { activeNote, startDeleting } from '../../actions/notes';


//api para poder subir una imagen
//https://api.cloudinary.com/v1_1/<cloud_name>/image/upload
//hay que anexar file y upload_preset el cual es el que se creo en upload unsigned
//https://api.cloudinary.com/v1_1/jlxp/image/upload

export const NoteScreen = () => {
  
  const dispatch = useDispatch();

  const {active:note} = useSelector( state => state.notes );


  //No cambia el useForm solo asi por que maneja su propio estado
  const [formValues, handleInputChange, reset] = useForm( note );

  const {body, title,id} = formValues;

  /*useRef permite almacenar una variable mutable que 
  no va a redibujar todo el componente
  si cambia */
  const  activeId = useRef( note.id );

  useEffect(()=>{
    /* si son diferentes se de reiniciar el
    formulario*/
    if( note.id !== activeId.current){
        reset(note);
        activeId.current = note.id;
    }
  },[note, reset])

  useEffect(()=>{
      dispatch( activeNote ( formValues.id, {...formValues}));
  },[ formValues, dispatch])

  const handleDelete = () => {
      dispatch(startDeleting( id ));
  }


  return (
    <div className="notes__main-content">
        <NoteAppBar/>

        <div className="notes__content">
            <input
                type="text"
                placeholder="Some awesome title"
                className="notes__title-input"
                autoComplete="off"
                name = "title"
                value = { title }
                onChange = { handleInputChange }
            ></input>
            <textarea
                placeholder="What happened today"
                className="notes__textarea"
                name = "body"
                value = { body }
                onChange = { handleInputChange }
            ></textarea>
            {
                (note.url)
                &&
                <div className="notes__image">
                    <img
                        src={note.url}
                        alt="imagen"
                    ></img>
                </div> 
            }
                
        </div>

        <button className='btn btn-danger' onClick={handleDelete}>Delete</button>
    </div>
  )
}

