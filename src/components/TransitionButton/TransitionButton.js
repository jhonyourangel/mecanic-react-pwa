import React from 'react'
import css from './TransitionButton.module.css'
import CheckIcon from '../CheckIcon/CheckIcon';

const TransitionButton = (props) => {


   return (
        
       <div className={[css.TransitionButton, (props.billed ? css.TransitionButtonBorderColorBilled : css.TransitionButtonBorderColorNotBilled)].join(' ')}>
            <button onClick={props.click} 
            className={[css.TransitionButton, (props.billed ? css.BilledColor : css.NotBilledColor)].join(' ')}
            > {props.status} </button>
            <CheckIcon type={props.isLoading ? 'loading' : props.billed ? 'billed' : 'not billed'}/>
        </div>
    )
}

export default TransitionButton
