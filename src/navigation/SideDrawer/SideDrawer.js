import React from 'react';
import Logo from '../../components/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import css from './SideDrawer.module.css';
import Backdrop from '../../components/Backdrop/Backdrop';
import Aux from '../../hoc/Aux/Aux';

const SideDrawer = ( props ) => {
    let attachedCss = [css.SideDrawer, css.Close];
    if (props.open) {
        attachedCss = [css.SideDrawer, css.Open];
    }
    return (
        <Aux> 
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedCss.join(' ')} onClick={props.closed}>
                <div className={css.Logo}>
                    <Logo />
                </div>
                <nav className={css.SidebarNav}>
                    <NavigationItems isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </Aux>
    );
};

export default SideDrawer;
