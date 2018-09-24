import React from 'react';
import { connect } from 'react-redux';

import css from './Toolbar.module.css';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import Aux from '../../hoc/Aux/Aux';

export const Toolbar = ( props ) => (
    <Aux>
        <header className={css.Toolbar}>
            <DrawerToggle clicked={props.drawerToggleClicked} /> 
            <h2 className={css.ProjName}>Auto SOFPET <span className={css.alpha}>(alpha)</span></h2>       
        </header>
        { props.loading ? <div className={css.Loading}> </div> : null }
    </Aux>
);

const mapStateToProps = state => {
    return {
        loading: state.transaction.loading
    }
}

export default connect(mapStateToProps)(Toolbar);