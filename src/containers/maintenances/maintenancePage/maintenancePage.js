import React, { Component } from 'react'
// import css from './maintenancePage.module.css'
import Aux from '../../../hoc/Aux/Aux';
import { connect } from 'react-redux'
import axios from '../../../network/axios'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions'

class MaintenancePage extends Component {

    componentDidMount = () => {
        
    }

    render() {
        return (
            <div>MaintenancePage</div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        loading: state.maintenance.loading,
        maintenance: state.maintenance.maintenance
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchMaintenance: maintenance => dispatch(actions.fetchMaintenance(maintenance)),
        onFetchMaintenances: () => dispatch(actions.fetchMaintenances()),
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(MaintenancePage, axios));
