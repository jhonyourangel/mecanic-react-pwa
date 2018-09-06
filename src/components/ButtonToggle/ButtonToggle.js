import React from 'react'
import css from './ButtonToggle.module.css'

const ButtonToggle = (props) => {

    const classes = [css.ButtonToggle, (props.active ? css.ButtonToggleActive : '')].join(' ')
    return (
        <button id={props.id} className={classes} onClick={props.click}> {props.children} </button>
    )   
}

export default ButtonToggle
