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
        redirect: null,
        searchText: ''
    }
    componentDidMount() {
        this.props.onFetchVehicles()
    }

    searchValue = val => {
        console.log(val)
        this.setState({searchText: val})
        // this.forceUpdate()
    }

    searchCB = (item) => {
        const st = this.state.searchText 
        if (st === '') {
            return true
        }

        const stREG = new RegExp(st, 'gi')
        console.log(st, stREG, item.plateNumber)

        return  stREG.test(item.plateNumber) || 
        stREG.test(item.vin)
    }

    addVehicle = () => {
        console.log("add vehicle")
        this.setState({redirect: <Redirect to="/vehicol/new-vehicle" />})
    }

    vehicleCells = () =>{
        if (this.props.vehicles === undefined) {return null}
        // console.log('this.props.vehicle:', this.props.vehicles)
        console.log('generate vehicles while searching');
        
        return this.props.vehicles
        .filter(this.searchCB)
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
