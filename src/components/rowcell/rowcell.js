import React from 'react'
import css from './rowcell.module.css'

const Rowcell = (props) => {
   return (
        <section className={css.Rowcell}>
                {props.children}
        </section>
    )   
}

export default Rowcell
