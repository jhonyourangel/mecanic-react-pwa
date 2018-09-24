import React, { Component } from 'react'
import css from './vehicole.module.css'
import { MdAddCircle } from 'react-icons/md';

import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import axios from '../../network/axios'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions'

import VehicolCell from './vehicolCell/vehicolCell';
import SearchBar from '../../components/searchBar/searchBar';

class Vehicole extends Component {
    state = {
        redirect: null
    }
    componentDidMount() {
        this.props.onFetchVehicles()
        this.redirect = null
    }

    searchValue = val => {
        console.log(val)
    }

    addVehicle = () => {
        console.log("add vehicle")
        this.setState({redirect: <Redirect to="/vehicol/new-vehicle" />})
    }

    vehicleCells = () =>{
        return this.props.vehicles
        .filter(item => item.sync !== 'delete')
        .map( vehicle => {
            return <VehicolCell key={vehicle.plateNumber} vehicle={vehicle}></VehicolCell>
        })
    }
        render() {
            return (
                <div>
                {this.state.redirect}
                <div className={css.ToolBar}>
                    <button onClick={e => this.addVehicle(e)}>
                        <MdAddCircle />
                    </button>
                    <SearchBar onChange={val => this.searchValue(val)}></SearchBar>
                </div>
                {this.vehicleCells()}
            </div>
            )
        }
    }


const mapStateToProps = state => {
    return {
        vehicles: state.vehicle.vehicles,
        loading: state.vehicle.loading,
        token: state.auth.token,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchVehicles: () => dispatch(actions.fetchVehicles()),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Vehicole, axios));
