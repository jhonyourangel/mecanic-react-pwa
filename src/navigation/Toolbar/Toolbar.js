import React from 'react';
import { connect } from 'react-redux';

import css from './Toolbar.module.css';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import Aux from '../../hoc/Aux/Aux';

export const Toolbar = ( {
    loading = true, 
    drawerToggleClicked
    } ) => (
    <Aux>
        { loading ? <div className={css.Loading}> </div> : null }
        <header className={css.Toolbar}>
            <DrawerToggle clicked={drawerToggleClicked} /> 
            <h2 className={css.ProjName}>Auto SOFPET <span className={css.alpha}>(alpha)</span></h2>       
        </header>
    </Aux>
);

const mapStateToProps = state => {
    return {
        loading: state.transaction.loading
    }
}

export default connect(mapStateToProps)(Toolbar);