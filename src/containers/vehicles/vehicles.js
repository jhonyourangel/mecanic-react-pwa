import React, { Component } from 'react'
// import css from './vehicles.module.css'

import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import axios from '../../network/axios'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions'

import VehicleCell from './vehicleCell/vehicleCell';
import SearchBar from '../../components/searchBar/searchBar';

class Vehicole extends Component {
    state = {
        searchText: ''
    }
    
    componentDidMount() {
        this.redirect = (this.props.token === undefined) ? <Redirect to="/auth" /> : null
        console.log("redirect:",this.redirect);
        this.props.onFetchVehicles()
    }

    searchValue = val => {
        this.setState({searchText: val})
    }

    searchCB = (item) => {
        const st = this.state.searchText 
        // find a regex way of doing this and remove this ugly if
        if (st === '') {
            return true
        }

        const stREG = new RegExp(st, 'gi')
        return  stREG.test(item.plateNumber) || 
        stREG.test(item.vin)
    }


    vehicleCells = () =>{
        if (this.props.vehicles === undefined) {return null}        
        return this.props.vehicles
        .filter(this.searchCB)
        .map( vehicle => {
            return <VehicleCell key={vehicle.plateNumber} vehicle={vehicle}></VehicleCell>
        })
    }
        render() {
            return (
                <div>
                    {this.redirect}
                    <SearchBar to="/vehicle/new-vehicle"  onChange={val => this.searchValue(val)}></SearchBar>
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

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(Vehicole, axios));
