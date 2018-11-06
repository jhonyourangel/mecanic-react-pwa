import React from 'react';
import { withRouter } from 'react-router-dom'
import css from './DrawerToggle.module.css';

const DrawerToggle = (props) => {
    const pathDeepLevel = () => window.location.pathname.match(/\/./g) && window.location.pathname.match(/\/./g).length
    const cssClasses = () => [css.DrawerToggle, (pathDeepLevel()-1 < 1) ? '' : css.Arrow ].join(' ')
    
    const clickHandler = () => {
        if ( pathDeepLevel()-1 < 1 ) {
            props.onClick()
        } else {
            props.history.goBack()
        }
    } 

    return (
        <section className={cssClasses()} onClick={clickHandler}>
            <div></div>
            <div></div>
            <div></div>
        </section>
    )
}

export default withRouter(DrawerToggle)
