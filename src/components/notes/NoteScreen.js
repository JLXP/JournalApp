import React from 'react'
import { NoteAppBar } from './NoteAppBar'

export const NoteScreen = () => {
  return (
    <div className="notes__main-content">
        <NoteAppBar/>

        <div className="notes__content">
            <input
                type="text"
                placeholder="Some awesome title"
                className="notes__title-input"
                autoComplete="off"
            ></input>
            <textarea
                placeholder="What happened today"
                className="notes__textarea"
            ></textarea>
            <div className="notes__image">
                <img
                    src="https://www.creativefabrica.com/wp-content/uploads/2020/04/25/illustration-of-natural-landscape-Graphics-3952025-1-1-580x412.jpg"
                    alt="imagen"
                ></img>
            </div>     
        </div>
    </div>
  )
}

