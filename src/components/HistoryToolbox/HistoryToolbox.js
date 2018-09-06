import React from 'react'
import css from './HistoryToolbox.css'

const HistoryToolbox = (props) => {

    return (
        <div className={ css.HistoryToolbox }>
            <button onClick={props._addHandler}>add</button>
            <button onClick={props._editHandler}>edit all</button>
            <button onClick={props._filterHandler}>filter</button>
        </div>
    )   
}

export default HistoryToolbox
