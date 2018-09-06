import React, { Component } from 'react'
import css from './HistoryCell.css'
import * as moment from 'moment'
import TransitionButton from '../../../components/TransitionButton/TransitionButton';

class HistoryCell extends Component {

    // this needs to be cleaned
    // i was trying to handle editing 
    // from here directly but i changed my mind
    constructor(props) {
        super(props)
        this.tran = {
            creationDate: new Date(),
            editDate: new Date(),
            billed: false,
            _id: "5b24f5b21f15dc0014ffdb99",
            description: "in sync",
            startTime: new Date(),
            endTime: new Date(),
            userId: "",
            projectName: "Empty",
            id: "0",
        }
        if (this.props.tran !== null) {
            console.log('this.props.tran.billed:',this.props.tran.billed);
            
            this.tran = this.props.tran
            this.setState({billed: props.tran.billed})
        }
    }
    state = {
        billed: (this.tran === null || this.tran === undefined) ? false : this.tran.billed,
        isLoading: false
    }

    earnAmount() {
        const startTime = moment(this.tran.startTime)
        const endTime = moment(this.tran.endTime)

        let duration = moment.duration(endTime.diff(startTime));
        let minutes = duration.asMinutes();
        console.log('this.props.proj:', this.props.proj);
        
        if (this.props.proj) {
            return Number(minutes * this.props.proj.income / 6000).toFixed()
        }
        return minutes * 0
    }

    togglePayedHandler = () => {
    }

    fromDateToString = (date) => moment(date).format('HH:mm')
    dateFiff = (data1, date2) => moment.utc(moment(date2).diff(moment(data1))).format('HH:mm')

    render() {

        return (
            <div className={css.HistoryCell} onClick={this.props.clicked}>
                <div className={css.WorkedDate}>
                    <p className={css.Day}>{moment(this.tran.startTime).format('DD')}</p>
                    <p className={css.Month}>{moment(this.tran.startTime).format('MMM')}</p>
                    <p className={css.Year}>{moment(this.tran.startTime).format('YYYY')}</p>
                </div>

                <div className={css.WorkedTime}>
                    <p className={css.WorkedSum}>{this.dateFiff(this.tran.startTime, this.tran.endTime)}</p>
                    <p className={css.WorkedPeriods}>{this.fromDateToString(this.tran.startTime)} > {this.fromDateToString(this.tran.endTime)}</p>
                    <p className={css.ProjectName}>{this.tran.projectName}</p>
                </div>

                <div className={css.Earned}>
                    <p className={css.EarnedSum}>€ {this.earnAmount()}</p>
                    <TransitionButton
                        billed={this.props.tran.billed}
                        click={this.togglePayedHandler}
                        isLoading={this.state.isLoading}
                        status={this.props.tran.billed ? 'payed' : 'not payed'} />
                </div>
            </div>
        )
    }
}

export default HistoryCell
