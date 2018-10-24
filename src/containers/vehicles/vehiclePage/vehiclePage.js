import React, {Component} from 'react'
import { Redirect, Link } from 'react-router-dom'

import css from './vehicol.module.css'
import Aux from '../../../hoc/Aux/Aux';
import {MdArrowBack, MdSave, MdDelete} from 'react-icons/md'
import Rowcell from '../../../components/rowcell/rowcell'
import { connect } from 'react-redux'
import axios from '../../../network/axios'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions'


class Vehicol extends Component {
    state = {
        vehicle: {
            plateNumber: this.props.match.params.plateNumber,
            plateNationality: '',
            carKm: 0,
            owner: '',
            email: '',
            phoneNumber: '',
            brand: '',
            model: '',
            year: 0,
            vin: '',
        },
        deleteButton: this.props.match.params.plateNumber !== 'new-vehicle',
        focusInput: null
    }

    componentDidMount = async () => {
        await this.props.onFetchVehicle(this.props.match.params.plateNumber).then(console.log).catch(console.log)
        this.redirectToVehicles = null
    }

    static getDerivedStateFromProps(props, state) {
        console.log('called')
        if (props.vehicle.plateNumber === state.vehicle.plateNumber && state.focusInput === null) {
            console.log("props.vehicle:", props.vehicle)
            return {vehicle: {...props.vehicle}}
        }
        return state
    }

    save = async () => {
        try {

            if (this.props.vehicle._id === undefined) 
            {this.props.onNewVehicle({...this.state.vehicle})} 
            else {this.props.onEditVehicle({...this.state.vehicle})}

            // save and go to vehicles
            this.redirectToVehicles = (<Redirect to="/vehicole" />)
            
        } catch (error) {
            console.log(error)
        }
    }

    focusChange = async e => {
        console.log("focusChange:", e.target.name)
        this.setState({focusInput: e.target.name})
    }

    delete = (v) => {
        console.log(v)
        this.props.onDeleteVehicle(v)
    }

    inputChange = async e => {
        this.setState({
            vehicle: {
                ...this.state.vehicle,
                [e.target.name]: e.target.value,            
                sync: this.state.vehicle.plateNumber === '' ? 'new' : 'edited'
            }
        })
    }

    render() {
        const v = this.state.vehicle
        const deleteButton = this.state.deleteButton ? 
            <button className={css.delete} onClick={()=>this.delete(v)}>
                <MdDelete 
                    style={{fill: 'red'}}/> Delete 
            </button> : 
            null

        const redirect = v.sync === 'delete' ? <Redirect to="/vehicole" /> : null

        return (
            <Aux>
                {this.redirectToVehicles}
                {redirect}
                    <Link 
                    to="/vehicole"
                    className={css.goBack} 
                    
                    >
                    <MdArrowBack 
                        style={{fill: '#8E6E53'}}
                        /> Vehicole </Link>
                    <button className={css.save} 
                        onClick={()=>this.save()} 
                        disabled={ v.plateNumber === 'new-vehicle'}>
                        <MdSave 
                        style={{fill: v.plateNumber === 'new-vehicle' ? '#ccc' : '#496F5D'}}/> Save 
                    </button>
                    {deleteButton}
                <p className={css.PlateNumber}><strong>RO - {v.plateNumber}</strong></p>

                <section className={css.Vehicol}>
                    <Rowcell>
                        <header className={css.CellHeader}>
                            <h1>Informatii Masina</h1>
                        </header>
                        <fieldset>
                            <label htmlFor="owner">Proprietar: </label>
                            <input type="text" name="owner" placeholder="" onFocus={e=> this.focusChange(e)} onBlur={e => this.blurChange(e)} onChange={e => this.inputChange(e)} value={v.owner}/>
                        </fieldset>
                        <fieldset>
                            <label htmlFor="phoneNumber">Nr De Telefon: </label>
                            <input type="text" name="phoneNumber" placeholder="" onFocus={e=> this.focusChange(e)} onBlur={e => this.blurChange(e)} onChange={e => this.inputChange(e)} value={v.phoneNumber}/>
                        </fieldset>
                        <fieldset>
                            <label htmlFor="email">Email: </label>
                            <input type="text" name="email" placeholder="" onFocus={e=> this.focusChange(e)} onBlur={e => this.blurChange(e)} onChange={e => this.inputChange(e)} value={v.email}/>
                        </fieldset>
                        <fieldset>
                            <label htmlFor="plateNumber">Plate Number: </label>
                            <input type="text" name="plateNumber" placeholder="" onFocus={e=> this.focusChange(e)} onBlur={e => this.blurChange(e)} onChange={e => this.inputChange(e)} value={v.plateNumber}/>
                        </fieldset>
                        <fieldset>
                            <label htmlFor="brand">Brand: </label>
                            <input type="text" name="brand" placeholder="" onFocus={e=> this.focusChange(e)} onBlur={e => this.blurChange(e)} onChange={e => this.inputChange(e)} value={v.brand}/>
                        </fieldset>
                        <fieldset>
                            <label htmlFor="model">Model: </label>
                            <input type="text" name="model" placeholder="" onFocus={e=> this.focusChange(e)} onBlur={e => this.blurChange(e)} onChange={e => this.inputChange(e)} value={v.model}/>
                        </fieldset>
                        <fieldset>
                            <label htmlFor="year">An Productie: </label>
                            <input type="text" name="year" placeholder="" onFocus={e=> this.focusChange(e)} onBlur={e => this.blurChange(e)} onChange={e => this.inputChange(e)} value={v.year}/>
                        </fieldset>
                        <fieldset>
                            <label htmlFor="carKm">Km Bord: </label>
                            <input type="text" name="carKm" placeholder="" onFocus={e=> this.focusChange(e)} onBlur={e => this.blurChange(e)} onChange={e => this.inputChange(e)} value={v.carKm}/>
                        </fieldset>
                        <fieldset>
                            <label htmlFor="vin">Serie Sasiu: </label>
                            <input type="text" name="vin" placeholder="introdu o serie de sasiu" onFocus={e=> this.focusChange(e)} onBlur={e => this.blurChange(e)} onChange={e => this.inputChange(e)} value={v.vin}/>
                        </fieldset>
                    </Rowcell>

                    <Rowcell>
                        <header className={css.CellHeader}>
                        demo intretineri
                            <h1>15/03/2018</h1>
                            <h1>km 215000</h1>
                        </header>
                        <fieldset>
                            <label htmlFor="mDate">Data  </label>
                            <input type="date" name="mDate"  onFocus={e=> this.focusChange(e)} onBlur={e => this.blurChange(e)} onChange={e => this.inputChange(e)} value='2018-03-15'/>
                        </fieldset>
                        <fieldset>
                            <label htmlFor="mKm">Km in bord  </label>
                            <input type="text" name="mKm"  onFocus={e=> this.focusChange(e)} onBlur={e => this.blurChange(e)} onChange={e => this.inputChange(e)} value='230000'/>
                        </fieldset>
                    </Rowcell>
                </section>

            </Aux>
        )
    }
}
const mapStateToProps = state => {
    return {
        vehicle: state.vehicle.vehicle,
        loading: state.vehicle.loading,
        token: state.auth.token,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchVehicle: (plateNumber) => dispatch(actions.fetchVehicle(plateNumber)),
        onFetchVehicles: () => dispatch(actions.fetchVehicles()),
        onNewVehicle: (newVehi) => dispatch(actions.newVehicle(newVehi)),
        onEditVehicle: (editVehi) => dispatch(actions.editVehicle(editVehi)),
        onDeleteVehicle: (deleteVehi) => dispatch(actions.deleteVehicle(deleteVehi)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Vehicol, axios));
