import React, {useEffect,useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { NoteAppBar } from './NoteAppBar';
import { activeNote } from '../../actions/notes';



export const NoteScreen = () => {
  
  const dispatch = useDispatch();

  const {active:note} = useSelector( state => state.notes );
  
  const [formValues, handleInputChange, reset] = useForm( note );

  const {body, title} = formValues;

  /*useRef permite almacenar una variable mutable que 
  no va a redibujar todo el componente
  si cambia */
  const  activeId = useRef( note.id );

  useEffect(()=>{
    /* si son diferentes se de reiniciar el
    formulario*/
    if( note.id != activeId.current){
        reset(note);
        activeId.current = note.id;
    }
  },[note, reset])

  useEffect(()=>{
      dispatch( activeNote ( formValues.id, {...formValues}));
  },[ formValues, dispatch])


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
                        src="https://www.creativefabrica.com/wp-content/uploads/2020/04/25/illustration-of-natural-landscape-Graphics-3952025-1-1-580x412.jpg"
                        alt="imagen"
                    ></img>
                </div> 
            }
                
        </div>
    </div>
  )
}

