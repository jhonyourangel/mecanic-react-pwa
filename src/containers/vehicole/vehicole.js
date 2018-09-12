import React, { Component } from 'react'
import css from './vehicole.module.css'
import { MdAddCircle } from 'react-icons/md';

import { connect } from 'react-redux'

import axios from '../../network/axios'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions'

import VehicolCell from './vehicolCell/vehicolCell';
import SearchBar from '../../components/searchBar/searchBar';

class Vehicole extends Component {
    componentDidMount() {
        this.props.onFetchVehicles()
        console.log(this.props);
    }

    searchValue = val => {
        console.log(val)
    }

    addVehicle = e => {
        console.log("add vehicle")
    }

    vehicleCells = () =>{
        return this.props.vehicles.map( vehicle => {
            console.log(vehicle.plateNumber)
            return <VehicolCell key={vehicle.plateNumber} vehicle={vehicle} ></VehicolCell>
        })
    }
        render() {
            return (
                <div>
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
        userId: state.auth.userId,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchVehicles: () => dispatch(actions.fetchVehicles()),
        onNewVehicle: (newVehi) => dispatch(actions.newVehicle(newVehi)),
        onEditVehicle: (editVehi) => dispatch(actions.editVehicle(editVehi)),
        onDeleteVehicle: (deleteVehi) => dispatch(actions.deleteVehicle(deleteVehi)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Vehicole, axios));
