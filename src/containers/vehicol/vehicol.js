import React, {Component} from 'react'
import css from './vehicol.module.css'
import Aux from '../../hoc/Aux/Aux';
import {MdArrowBack, MdSave, MdDelete} from 'react-icons/md'
import Rowcell from '../../components/rowcell/rowcell'
import { connect } from 'react-redux'
import axios from '../../network/axios'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions'


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
        deleteButton: this.props.match.params.plateNumber !== 'new-vehicle'
    }

    componentDidMount = async () => {
        await this.props.onFetchVehicle(this.state.vehicle.plateNumber).then(console.log).catch(console.log)
        this.setState({vehicle: {
            ...this.state.vehicle,
            ...this.props.vehicle,
        }})
    }

    goBack = async () => {
        this.props.history.goBack();
    }

    save = async () => {
        await this.props.onFetchVehicle(this.state.vehicle.plateNumber).then(console.log).catch(console.log)
        this.props.vehicle === undefined ? 
            this.props.onNewVehicle({...this.state.vehicle}) :
            this.props.onEditVehicle({...this.state.vehicle})

        console.log(this.state.vehicle.plateNumber, this.props.vehicle)
        
        // 
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
            <button className={css.delete} onClick={()=>this.props.onDeleteVehicle(v)}>
                <MdDelete 
                    style={{fill: 'red'}}/> Delete 
            </button> : 
            null

        return (
            <Aux>
                    <button className={css.goBack} onClick={()=>this.goBack()}><MdArrowBack 
                        style={{fill: '#8E6E53'}}
                        /> BACK </button>
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
                            <input type="text" name="owner" placeholder="" onChange={e => this.inputChange(e)} value={v.owner}/>
                        </fieldset>
                        <fieldset>
                            <label htmlFor="phoneNumber">Nr De Telefon: </label>
                            <input type="text" name="phoneNumber" placeholder="" onChange={e => this.inputChange(e)} value={v.phoneNumber}/>
                        </fieldset>
                        <fieldset>
                            <label htmlFor="email">Email: </label>
                            <input type="text" name="email" placeholder="" onChange={e => this.inputChange(e)} value={v.email}/>
                        </fieldset>
                        <fieldset>
                            <label htmlFor="plateNumber">Plate Number: </label>
                            <input type="text" name="plateNumber" placeholder="" onChange={e => this.inputChange(e)} value={v.plateNumber}/>
                        </fieldset>
                        <fieldset>
                            <label htmlFor="brand">Brand: </label>
                            <input type="text" name="brand" placeholder="" onChange={e => this.inputChange(e)} value={v.brand}/>
                        </fieldset>
                        <fieldset>
                            <label htmlFor="model">Model: </label>
                            <input type="text" name="model" placeholder="" onChange={e => this.inputChange(e)} value={v.model}/>
                        </fieldset>
                        <fieldset>
                            <label htmlFor="year">An Productie: </label>
                            <input type="text" name="year" placeholder="" onChange={e => this.inputChange(e)} value={v.year}/>
                        </fieldset>
                        <fieldset>
                            <label htmlFor="carKm">Km Bord: </label>
                            <input type="text" name="carKm" placeholder="" onChange={e => this.inputChange(e)} value={v.carKm}/>
                        </fieldset>
                        <fieldset>
                            <label htmlFor="vin">Serie Sasiu: </label>
                            <input type="text" name="vin" placeholder="introdu o serie de sasiu" onChange={e => this.inputChange(e)} value={v.vin}/>
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
                            <input type="date" name="mDate"  onChange={e => this.inputChange(e)} value='2018-03-15'/>
                        </fieldset>
                        <fieldset>
                            <label htmlFor="mKm">Km in bord  </label>
                            <input type="text" name="mKm"  onChange={e => this.inputChange(e)} value='230000'/>
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
