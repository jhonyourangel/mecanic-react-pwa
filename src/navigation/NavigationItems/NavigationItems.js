import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Aux from '../../hoc/Aux/Aux';

const NavigationItems = ( props ) => {
    let navigationItems = (
        <Aux>
            <NavigationItem link="/dashboard">Dashboard</NavigationItem>
            <NavigationItem link="/history">History</NavigationItem>
            <NavigationItem link="/projects">Projects</NavigationItem>
        </Aux>
    )
    return (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Home</NavigationItem>
        {props.isAuthenticated ? navigationItems : null}
        {!props.isAuthenticated
            ? <NavigationItem link="/auth">Authenticate</NavigationItem>
            : <NavigationItem link="/logout">Logout</NavigationItem>}
    </ul>
)}

export default NavigationItems;
