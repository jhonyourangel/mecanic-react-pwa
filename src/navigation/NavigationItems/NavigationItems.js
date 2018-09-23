import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Aux from '../../hoc/Aux/Aux';

const NavigationItems = ( props ) => {
    let navigationItems = (
        <Aux>
            <NavigationItem link="/vehicole">Vehicole</NavigationItem>
            <NavigationItem link="/intretineri">Intretineri</NavigationItem>
            <NavigationItem link="/produse">Produse</NavigationItem>
            <NavigationItem link="/logout">Logout</NavigationItem>
        </Aux>
    )
    return (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Bord</NavigationItem>
        {props.isAuthenticated ? 
            navigationItems : 
            <NavigationItem link="/auth">Authenticate</NavigationItem>}
    </ul>
)}

export default NavigationItems;
