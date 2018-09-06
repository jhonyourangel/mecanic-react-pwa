import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions'
import * as AT from '../../store/actions/actionTypes'

import css from './DateRangeCell.module.css'
import moment from 'moment'
import ButtonToggle from '../ButtonToggle/ButtonToggle';

const INPUT_DATE_FORMAT = 'YYYY-MM-DD'

class DateRangeCell extends Component {
    
    state = {
        buttons: [
            {
                id: AT.DATE_LAST_7_DAYS,
                value: '7 days'
            }, 
            {
                id: AT.DATE_LAST_14_DAYS,
                value: '14 days'
            }, 
            {
                id: AT.DATE_LAST_1_MONTH,
                value: '1 month'
            }, 
            {
                id: AT.DATE_LAST_3_MONTH,
                value: '3 month'
            }, 
            {
                id: AT.DATE_LAST_6_MONTH,
                value: '6 month'
            }, 
            {
                id: AT.DATE_LAST_1_YEAR,
                value: '1 year'
            }, 
            {
                id: AT.DATE_ALL_TIME,
                value: 'all time'
            }],
        activeBtnId: AT.DATE_LAST_7_DAYS
    } 
        
    componentDidMount() {
        this.props.onGenericDateRangeSelector(AT.DATE_LAST_7_DAYS)
        this.setState({activeBtnId: this.state.buttons[1].id})
        // this.props.onDateStart(moment().subtract(1, "days"))
        this.props.onDateEnd(moment())
    }

    inputOnChangeHandler = (event) => {
        const newMomentDate = moment.utc(event.target.value, INPUT_DATE_FORMAT)
        switch (event.target.id) {
            case 'dateStart': 
                this.props.onDateStart(newMomentDate)
                break

            case 'dateEnd':
                this.props.onDateEnd(newMomentDate)
                break

            default:
                console.log('unknow input')
                break
            }
        }
    
    changePresetDateHandler = (e) => {
        console.log('clicked', e.target.id )
        this.setState({activeBtnId: e.target.id})
        this.props.onGenericDateRangeSelector(e.target.id)
    }

    render() {
        const btns = this.state.buttons.map((item) => {
            return <ButtonToggle 
            key={item.id}
            id={item.id}
            active={item.id === this.state.activeBtnId}
            click={(e) => this.changePresetDateHandler(e)}
            > 
            {item.value} </ButtonToggle>
        })
        return (
            <div className={css.DateRangeCell}>
            <div className={css.DateInputs}>
                <label htmlFor="from">from:</label>
                <input id="dateStart" name="from" type="date" value={moment(this.props.dateStart).format(INPUT_DATE_FORMAT)} onChange={(event) => this.inputOnChangeHandler(event)}/>
                <label htmlFor="to">to:</label>
                <input id="dateEnd" name="to" type="date" value={moment(this.props.dateEnd).format(INPUT_DATE_FORMAT)} onChange={(event) => this.inputOnChangeHandler(event)}/>
            </div>
            <div className={css.DatePresetRange}>
                {btns}
            </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        dateStart: state.date.dateStart,
        dateEnd: state.date.dateEnd
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDateStart: (dateStart) => dispatch(actions.dateStart(dateStart)),
        onDateEnd: (dateEnd) => dispatch(actions.dateEnd(dateEnd)),
        onGenericDateRangeSelector: (ACTION_TYPE) => dispatch(actions.genericDateRangeSelector(ACTION_TYPE)),

        // // Preset Date Range
        // onLast7Days: () => dispatch(actions.dateLast7Days()),
        // onLast14Days: () => dispatch(actions.dateLast14Days()),
        // onLast1Month: () => dispatch(actions.dateLast1Month()),
        // onLast3Month: () => dispatch(actions.dateLast3Month()),
        // onLast6Month: () => dispatch(actions.dateLast6Month()),
        // onLast1Year: () => dispatch(actions.dateLast1Year()),
        // onAllTime: () => dispatch(actions.dateAllTime()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DateRangeCell)
