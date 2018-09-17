import React, { Component } from 'react'
import css from './syncBar.module.css'

import * as dexieVehicles from '../../store/indexdb/dexie-vehicle'
import * as axiosVehicles from '../../network/axios-vehicle'

class SyncBar extends Component {

    componentDidMount() {

    }

    refreshPage = () => {
        window.location.reload(false)
    }

    syncData = async () => { 
        const res = await axiosVehicles.fetchVehiclesFromServer()
        const allPromisees = res.data.map( vehicle => dexieVehicles.addVehicle(vehicle))
        Promise.all(allPromisees).then(console.log).catch(console.log)
    }

    render() {
        return (
            <div className={css.SyncBar}>
                <div>
                <button onClick={() => this.syncData()}>sync</button>
                <button onClick={() => this.refreshPage()}>refresh</button>
                </div>
            </div>
        )
    }
}

export default SyncBar
