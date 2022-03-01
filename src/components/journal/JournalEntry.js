import React from 'react';
import { useDispatch } from 'react-redux';
import dayjs from "dayjs";

import { activeNote } from '../../actions/notes';

// advancedFormat permite usar la fecha ordinal entre otras opciones
const advancedFormat = require("dayjs/plugin/advancedFormat");
dayjs.extend(advancedFormat);


export const JournalEntry = ({id, date, title, body, url}) => {

    const dispatch = useDispatch();

    const handleClickEntry = () =>{
        dispatch(activeNote(id,{
            date, title, body, url
        }));
    }
  
    const day = dayjs(date);

    return (
    <div className="journal__entry pointer" onClick={handleClickEntry}>
        {
            //si url existe se realiza la acción
            url &&
            <div 
            className="journal__entry-picture"
            style={{
            backgroundSize:'cover',
            backgroundImage:`$url(${url})`
            }}
            >
            </div>}
        <div className="journal__entry-body">
            <p className="journal__entry-title">
                {title}
            </p>
            <p className="journal__entry-content">
                {body}
            </p>
        </div>
        
        <div className="journal__entry-date-box">
            <span>{day.format("dddd")}</span>
            <h4>{day.format("Do")}</h4>
        </div>
    </div>
  )
}
