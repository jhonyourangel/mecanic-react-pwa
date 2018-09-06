import React, {Component} from 'react'
import css from './Dashboard.module.css'

import {connect} from 'react-redux'
import * as moment from 'moment'

import axios from '../../network/axios'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions'
import DateRangeCell from '../../components/DateRangeCell/DateRangeCell'

import ReactChartkick, {ColumnChart} from 'react-chartkick'
import Chart from 'chart.js'


ReactChartkick.addAdapter(Chart)

class Dashboard extends Component {

    state = {
        totalAmountPerMonth: [],
        tableData: [],
        
    }

    componentDidMount() {
    
    }
    // graph data
    totalAmountPerMonth = (props) => {
        const {
            dateStart,
            dateEnd
        } = props === undefined ? this.props : props

        let projectsMap = {}
        const arr = this.props.transactions
            .filter(tran => {
                return moment(tran.startTime).isAfter(dateStart) &&
                    moment(tran.endTime).isBefore(dateEnd)
            })
        arr.forEach(item => {
            const startTime = moment(item.startTime)
            const endTime = moment(item.endTime)

            const duration = moment.duration(endTime.diff(startTime));
            const minutes = duration.asMinutes();

            projectsMap[item.projectName] = minutes +
                (projectsMap[item.projectName] !== undefined ? projectsMap[item.projectName] : 0)
        });

        const returnArr = Object.keys(projectsMap).map(key => {
            return [
                key, Number(projectsMap[key]).toFixed(0)
            ]
        })
        
        return returnArr
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    toStringTime = (minutes) => {
        const hours = Math.floor(minutes / 60)
        const min = Math.floor(minutes % 60)
        
        const hoursStr = hours < 10 ? `0${hours}` : `${hours}`
        const minStr = min < 10 ? `0${min}` : `${min}`
        
        return `${hoursStr}h ${minStr}m`
      }

    tableData = (data) => {

        if (data.length < 1) {
            return []
        }

        const dataArr = data.map( (item, index) => {
            const [projectName, totalWorkedMinutes] = item
            const project = this.props.projects.filter(proj => proj.name === projectName)
            let projectIncome = project.length > 0 ?  project[0].income : 0

            return <tr key={index}>
                <td>{projectName}</td>
                <td>{this.toStringTime(totalWorkedMinutes)}</td>
                <td>{projectIncome}</td>
                <td>€ {Number(totalWorkedMinutes * projectIncome / 6000).toFixed()}</td>
            </tr>
        })

        return dataArr
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const totalAmountPerMonth = this.totalAmountPerMonth(nextProps)
        this.setState({
            totalAmountPerMonth: totalAmountPerMonth,
            tableData: this.tableData(totalAmountPerMonth)
        })
    }

    render() {
        return ( 
        <div >
            <DateRangeCell />
            <div className={css.DashboardCell}>
                <ColumnChart data = {this.state.totalAmountPerMonth}/> 
            </div>
            <div className={css.DashboardCell}>
                <table>
                    <thead>
                        <tr>
                            <th>Project Name</th>    
                            <th>Total Minutes</th>    
                            <th>Project Income</th>    
                            <th>Total Earned</th>  
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tableData}
                    </tbody>
                </table>         
            </div>
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        transactions: state.transaction.transactions,
        loading: state.transaction.loading,
        token: state.auth.token,
        userId: state.auth.userId,

        dateStart: state.date.dateStart,
        dateEnd: state.date.dateEnd,

        projects: state.project.projects,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchTransactions: () => dispatch(actions.fetchTransactions()),
        onNewTransaction: (newTran) => dispatch(actions.newTransaction(newTran)),
        onEditTransaction: (editTran) => dispatch(actions.editTransaction(editTran)),
        onDeleteTransaction: (deleteTran) => dispatch(actions.deleteTransaction(deleteTran)),

        onFetchProjects: () => dispatch(actions.fetchProjects()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Dashboard, axios));