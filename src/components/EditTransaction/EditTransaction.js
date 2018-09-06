import React, { Component } from 'react'
import Modal from '../Modal/Modal'
import Button from '../Button/Button'
import * as moment from 'moment'
import css from './EditTransaction.module.css'

const INPUT_DATE_FORMAT = 'YYYY-MM-DD'
// const INPUT_TIME_FORMAT = 'HH:mm'
const INPUT_DATETIME_FORMAT = "YYYY-MM-DDTHH:mm"


class EditTransaction extends Component {
    fromDateToString = (date) => moment(date).format('HH:mm')
    dateFiff = (data1, date2) => moment.utc(date2.diff(data1)).format('HH:mm')
    
    today = {
        start: moment(`${moment().format(INPUT_DATE_FORMAT)}T06:00`,INPUT_DATETIME_FORMAT),
        end: moment()
    }

    defaultTran = {
            workDate: moment(),
            startTime: localStorage.getItem('lastStartTime') !== null ? moment(localStorage.getItem('lastStartTime')) : this.today.start,
            endTime: localStorage.getItem('lastEndTime') !== null ? moment(localStorage.getItem('lastEndTime')) : this.today.end,
            billed: localStorage.getItem('lastBilled') || false,
            projectName: localStorage.getItem('lastJobName') || "unknown"
    }

    state = {
        tran: {
            ...this.defaultTran
        }
    }

    componentDidMount() {
        
        if (this.props.tran) {
            this.setState({
                tran: {
                    workDate: moment(this.props.tran.startTime),
                    ...this.props.tran,
                }
            })
        }  else {
            this.setState({tran: {
                        ...this.defaultTran,
                        startTime: localStorage.getItem('lastStartTime') !== null ? moment(localStorage.getItem('lastStartTime')) : this.today.start,
                        endTime: localStorage.getItem('lastEndTime') !== null ? moment(localStorage.getItem('lastEndTime')) : this.today.end,
                        billed: localStorage.getItem('lastBilled') || false,
                        projectName: localStorage.getItem('lastJobName') || "unknown"
            }})
        }      
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.tran !== null) {
            this.setState({
                tran: {
                    ...nextProps.tran,
                    workDate: moment(nextProps.tran.startTime),
                    startTime: moment(nextProps.tran.startTime),
                    endTime: moment(nextProps.tran.endTime),
                }
            })
        } else {
            this.setState({tran: {...this.defaultTran, 
                startTime: localStorage.getItem('lastStartTime') !== null ? moment(localStorage.getItem('lastStartTime')) : this.today.start,
                endTime: localStorage.getItem('lastEndTime') !== null ? moment(localStorage.getItem('lastEndTime')) : this.today.end,
                billed: localStorage.getItem('lastBilled') || false,
                projectName: localStorage.getItem('lastJobName') || "unknown"
            }})
        }
    }

    inputOnChangeHandler(e) {
        let formatedValue = null
        switch (e.target.type) {
            case 'date':
                formatedValue = moment(e.target.value, INPUT_DATE_FORMAT)
                console.log(formatedValue, moment(e.target.value, INPUT_DATE_FORMAT));
            break

            case 'datetime-local':
                formatedValue = moment(e.target.value, INPUT_DATETIME_FORMAT)
                console.log(formatedValue, moment(e.target.value, INPUT_DATETIME_FORMAT));
            break

            default:
                formatedValue = e.target.value
            break
        }
        this.setState({
            tran: {
                ...this.state.tran,
                [e.target.name]: formatedValue
            }
        })
    }

    toggleBilled = (e) => {
        this.setState({
            tran: {
                ...this.state.tran,
                billed: e.target.name === 'billed' ? true : false
            }
        })
    }

    prepareTranForUpload = () => {
        localStorage.setItem('lastJobName', this.state.tran.projectName)
        localStorage.setItem('lastStartTime', this.state.tran.startTime)
        localStorage.setItem('lastEndTime', this.state.tran.endTime)
        localStorage.setItem('lastBilled', this.state.tran.billed)
        return {...this.state.tran,}
    }

    render() {
        const tran = this.state.tran
        
        return (
            <Modal show={this.props.isModalVisible}>
                <fieldset>
                    <label htmlFor="startTime">Work Start </label>
                    <input 
                        id="startTime" 
                        name="startTime" 
                        type="datetime-local" 
                        value={tran.startTime.format(INPUT_DATETIME_FORMAT)}
                        onChange={(e) => this.inputOnChangeHandler(e)}/>
                    <br/>
                    <label htmlFor="endTime">Work End</label>
                    <input 
                        id="endTime" 
                        name="endTime" 
                        type="datetime-local"
                        min={tran.startTime.format(INPUT_DATETIME_FORMAT)} 
                        value={tran.endTime.format(INPUT_DATETIME_FORMAT)} 
                        onChange={(e) => this.inputOnChangeHandler(e)}/>
                <p className={css.WorkedSum}>{this.dateFiff(tran.startTime, tran.endTime)}</p>
            <label htmlFor="projectName">Project Name </label>
                <input id="projectName"
                    name="projectName"
                    type="text"
                    value={tran.projectName}
                    onChange={(e) => this.inputOnChangeHandler(e)}
                    />
            </fieldset>
            <fieldset>
                <div>
                    <input type="radio" id="billed" name="billed" checked={tran.billed === true}  onClick={(e) => this.toggleBilled(e)}/>
                    <label htmlFor="billed">Billed</label>
                </div>

                <div>
                    <input type="radio" id="notBilled" name="notBilled" checked={tran.billed === false} onClick={(e) => this.toggleBilled(e)}/>
                    <label htmlFor="notBilled">Not Billed</label>
                </div>

            </fieldset>
            <fieldset>
                <Button 
                btnType="Cancel"
                clicked={() => this.props.close()}
                >Cancel</Button>

                <Button 
                btnType="Success"
                clicked={() => this.props.save(this.prepareTranForUpload())}
                >Save</Button>
                
                {this.state.tran._id !== undefined ? 
                <Button 
                btnType="Danger"
                clicked={() => this.props.delete(tran)}
                >Delete</Button> : null}
            </fieldset>
            </Modal>       
             )
    }
}

export default EditTransaction
