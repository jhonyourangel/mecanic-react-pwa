import React, { Component } from 'react'
import css from './maintenance.module.css'
import { connect } from 'react-redux'

import axios from '../../network/axios'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions'

import SearchBar from '../../components/searchBar/searchBar';
import MaintenanceCell from './maintenanceCell/maintenanceCell';


class Intretineri extends Component {

    componentDidMount = async () => {
        await this.props.onFetchMaintenances()
        
    }

    generateMaintenanceRows = maintenancesArr => {
        const rows = maintenancesArr.map( item => {
            return <MaintenanceCell maintenance={item}></MaintenanceCell>
        })
        return rows
    }

    render() {
        return (
            <section>
                <SearchBar 
                to="/intretineri/new-intretinere" 
                onChange={val => this.searchValue(val)}></SearchBar>
                { this.generateMaintenanceRows(this.props.maintenances) }
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        maintenances: state.maintenance.maintenances,
        token: state.auth.token,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchMaintenances: () => dispatch(actions.fetchMaintenances()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(Intretineri, axios))
