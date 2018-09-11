import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Aux from '../../hoc/Aux/Aux';

const NavigationItems = ( props ) => {
    let navigationItems = (
        <Aux>
            <NavigationItem link="/vehicole">Vehicoli</NavigationItem>
            <NavigationItem link="/intretineri">Intretineri</NavigationItem>
            <NavigationItem link="/produse">Produse</NavigationItem>
        </Aux>
    )
    return (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Bord</NavigationItem>
        {props.isAuthenticated ? navigationItems : null}
        {!props.isAuthenticated
            ? <NavigationItem link="/auth">Authenticate</NavigationItem>
            : <NavigationItem link="/logout">Logout</NavigationItem>}
    </ul>
)}

export default NavigationItems;
