import React, { Component } from 'react'
import css from './syncBar.module.css'
import * as vehicle_axios from '../../network/axios-vehicle'
import * as vehicle_idb from '../../store/indexdb/vehicle'

class SyncBar extends Component {

    state = {
        new: 0,
        edit: 0,
        del: 0
    }

    componentDidMount() {

    }

    /**
     * fetchData and SyncData should have thei own file
     * later on remember to move them
     */
    fetchData = async () => {
        const vehicles = await vehicle_axios.fetchVehiclesFromServer()
        vehicles.data.map(async (v, i) => await vehicle_idb.createVehicle(v, i))
    }

    syncData = async () => {
        this.fetchData()

        const vehiclesNew = await vehicle_idb.getAllVehicle('new')
        const vehiclesEdit = await vehicle_idb.getAllVehicle('edit')
        const vehiclesDel = await vehicle_idb.getAllVehicle('del')
        
        this.setState({new: vehiclesNew.length, edit: vehiclesEdit.length, del: vehiclesDel.length})

        /**
         * TODO: you need to handle the errors from the server
         * in order to preserve the items that have not been 
         * saved to the server for any reason
         */
        vehiclesNew.map(async item => {
            this.updateState('new', -1)
            await vehicle_axios.pushNewVehicleToServer(item)
            vehicle_idb.createVehicle({...item,syncStatus: 'synced',})
        })

        vehiclesEdit.map(async item => {
            this.updateState('edit', -1)
            await vehicle_axios.editVehicle(item)
            vehicle_idb.createVehicle({...item,syncStatus: 'synced',})
        })

        vehiclesDel.map(async item => {
            this.updateState('dell', -1)
            await vehicle_axios.deleteVehicle(item)
            vehicle_idb.createVehicle({...item,syncStatus: 'synced-del',})
        })
    }

    updateState = (prop, value) => {
        this.setState(prevState => ({[prop]: this.state[prop] + value})) 
    }

    refreshPage = () => {
        window.location.reload(false)
    }

    render() {
        return (
            <div className={css.SyncBar}>
                <p> new: {this.state.new}  edit: {this.state.edit}  del: {this.state.del}</p>
                <div>
                    <button onClick={() => this.refreshPage()}>refresh</button>
                    <button onClick={() => this.syncData()}>sync</button>
                    <button onClick={() => this.testIDB_Edit()}>test edit</button>
                </div>
            </div>
        )
    }
}

export default SyncBar
