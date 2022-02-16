import React from 'react'

export const JournalEntry = () => {
  return (
    <div className="journal__entry pointer">
        <div 
            className="journal__entry-picture"
            style={{
            backgroundSize:'cover',
            backgroundImage:'url(https://www.xtrafondos.com/wallpapers/resized/paisaje-digital-en-atardecer-5846.jpg?s=large)'
            }}
        >
        </div>
        <div className="journal__entry-body">
            <p className="journal__entry-title">
                Un nuevo día
            </p>
            <p className="journal__entry-content">
                Culpa excepteursssdfsdgfgfgfd fdgfdg ddddddd proident fugiat 
            </p>
        </div>
        
        <div className="journal__entry-date-box">
            <span>Monday</span>
            <h4>28</h4>
        </div>
    </div>
  )
}
