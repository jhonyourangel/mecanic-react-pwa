import React from 'react';

import burgerLogo from '../../assets/images/TimeSheet.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={burgerLogo} alt="My Time Sheet" />
    </div>
);

export default logo;