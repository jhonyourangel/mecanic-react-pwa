import React, { Component } from 'react'
// import css from './intretineri.module.css'
import { connect } from 'react-redux'

import axios from '../../network/axios'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions'

import SearchBar from '../../components/searchBar/searchBar';


class Intretineri extends Component {
    render() {
        return (
            <div>
                <SearchBar 
                to="/intretineri/new-intretinere" 
                onChange={val => this.searchValue(val)}></SearchBar>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        vehicles: state.vehicle.vehicles,
        token: state.auth.token,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchMaintanance: () => dispatch(actions.fetchMaintanance()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(Intretineri, axios))