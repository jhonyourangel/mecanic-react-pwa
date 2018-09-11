import React from 'react'
import css from './vehicole.module.css'
import { MdAddCircle } from 'react-icons/md';

import VehicolCell from './vehicolCell/vehicolCell';
import SearchBar from '../../components/searchBar/searchBar';

const Vehicole = (props) => {

    const searchValue = val => {
        console.log(val)
    }

    const addVehicle = e => {
        console.log("add vehicle")
    }

   return (
        <div>
            <div className={css.ToolBar}>
                <button onClick={e => addVehicle(e)}>
                    <MdAddCircle />
                </button>
                <SearchBar onChange={val => searchValue(val)}></SearchBar>
            </div>
            <VehicolCell></VehicolCell>
        </div>
    )   
}

export default Vehicole
