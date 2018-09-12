import React, {Component} from 'react'
import css from './vehicol.module.css'
import Aux from '../../hoc/Aux/Aux';
import {MdArrowBack} from 'react-icons/md'
import Rowcell from '../../components/rowcell/rowcell'
import { connect } from 'react-redux'
import axios from '../../network/axios'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions'

class Vehicol extends Component {
    state = {
        vehicle: {
            plateNumber: this.props.match.params.plateNumber || '',
            plateNationality: '',
            carKm: 0,
            owner: '',
            email: '',
            phoneNumber: '',
            brand: '',
            model: '',
            year: 0,
            vin: '',
            clicked: () => {}
        }
    }

    componentDidMount = async () => {
        await this.props.onFetchVehicle(this.state.vehicle.plateNumber).then(console.log).catch(console.log)
        this.setState({vehicle: {...this.state.vehicle,...this.props.vehicle}})
    }

    goBack = () => {
        this.props.history.goBack();
    }

    inputChange = e => {
        this.setState({
            vehicle: {
                ...this.state.vehicle,
                [e.target.name]: e.target.value
            }
        })
    }

    render() {
        const v = this.props.vehicle
        return (
            <Aux>
                <button className={css.goBack} onClick={()=>this.goBack()}><MdArrowBack /> back</button>
                <p className={css.PlateNumber}><strong>RO - {v.plateNumber}</strong></p>

                <Rowcell>
                    <fieldset>
                        <label htmlFor="owner">Proprietar: </label>
                        <input type="text" name="owner" placeholder="" onChange={e => this.inputChange(e)} value={v.owner}/>
                    </fieldset>
                </Rowcell>
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
