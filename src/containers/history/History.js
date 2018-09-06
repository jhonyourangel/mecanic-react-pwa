import React, { Component } from 'react'
import HistoryCell from './HistoryCell/HistoryCell'

import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import axios from '../../network/axios'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions'
import Spinner from '../../components/Spinner/Spinner'
import Aux from '../../hoc/Aux/Aux'
// import DateRangeCell from '../../components/DateRangeCell/DateRangeCell'
// import HistoryToolbox from '../../components/HistoryToolbox/HistoryToolbox'
// import EditTransaction from '../../components/EditTransaction/EditTransaction'

class History extends Component {
    state = {
        isFilterActive: false,
        isEditAllActive: false,
        isModalVisible: false,
        selTran: null,
    }

    componentDidMount() {
        
    }


    _addHandler = () => {
        this.setState({
            isFilterActive: false,
            isModalVisible: !this.state.isModalVisible
        })
    }

    _editHandler = () => {
        console.log('edit handler')
        this.setState({
            isFilterActive: false,
            isEditAllActive: !this.state.isEditAllActive
        })
    }

    _filterHandler = () => {
        this.setState({
            isFilterActive: !this.state.isFilterActive,
            isAddTransactionActive: false,
            isEditAllActive: false
        })
    }

    openEditTransaction = (nr) => {
        console.log(nr, this.props.transactions[nr].id);
        this.setState({
            isModalVisible: true,
            selTran: nr !== null ? this.props.transactions[nr] : null
        })
    }

    closeModal = () => {
        this.setState({
            isModalVisible: false
        })
    }

    save = (tran) => {
        if (tran._id !== undefined && tran._id !== null) {
            // this.props.onNewTransaction(tran)
            this.props.onEditTransaction(tran)
            this.setState({
                isModalVisible: false,
                selTran: tran
            })
        } else {
            this.props.onNewTransaction(tran)
            this.setState({
                isModalVisible: false,
            })
        }
    }

    delete = (tran) => {
        this.props.onDeleteTransaction(tran)
        this.setState({
            isModalVisible: false,
        })
    }

    render() {
        
        let tranArr = <Spinner />
        if (!this.props.loading) {
            tranArr = this.props.transactions.map(tran => {
                return <HistoryCell
                    key={tran.id}
                    tran={tran}
                    save={(tran) => this.save(tran)}
                    proj={this.props.projects.find(p => p.name === tran.projectName)}
                    clicked={e => this.openEditTransaction(tran.id)}
                />
            })
        }

        if (!this.props.token) {
            tranArr = <Redirect to="/auth" />
        }

        return (
            <Aux>
                history
                {tranArr}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        transactions: state.transaction.transactions,
        loading: state.transaction.loading,
        token: state.auth.token,
        userId: state.auth.userId,

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

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(History, axios));