import React, { Component } from 'react'
import ProjectCell from './ProjectCell/ProjectCell';

import { connect } from 'react-redux'

import axios from '../../network/axios'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions'
import Aux from '../../hoc/Aux/Aux'
// import EditProject from '../../components/EditProject/EditProject'


class Projects extends Component {

    componentDidMount() {
        this.props.onFetchProjects(this.props.token, this.props.userId)
    }

    state = {
        isEditAllActive: false,
        selProj: null
    }

    _addHandler = () => {
        this.setState({
            isFilterActive: false,
            isEditAllActive: !this.state.isEditAllActive
        })
    }

    _openEditModal = (nr) => {
        const selProj = nr !== null ? this.props.projects[nr] : null
        console.log('edit handler: ', selProj)
        this.setState({
            selProj: selProj,
            isEditAllActive: !this.state.isEditAllActive,
        })
    }

    closeModal = () => {
        this.setState({
            isEditAllActive: false
        })
    }

    save = (proj) => {
        if (proj._id !== undefined && proj._id !== null) {
            this.props.onEditProject(proj)
            this.setState({
                isEditAllActive: false,
                selproj: proj
            })
        } else {
            this.props.onNewProject(proj)
            this.setState({
                isEditAllActive: false,
            })
        }
    }

    delete = (proj) => {
        this.props.onDeleteProject(proj)
        this.setState({
            isEditAllActive: false,
        })
    }

    render() {
        
        let projElements = null
        if (this.props.projects !== null && this.props.projects !== undefined) {
            projElements = this.props.projects.map(proj => {
                return <ProjectCell
                key={proj.id}
                proj={proj}
                clicked={() => this._openEditModal(proj.id)}
                ></ProjectCell>
            })
        }
        const proj = this.state.selProj
        console.log("proj", proj);
        
        return (
            <Aux>
                {projElements}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        projects: state.project.projects,
        loading: state.project.loading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchProjects: () => dispatch(actions.fetchProjects()),
        onNewProject: (newProj) => dispatch(actions.newProject(newProj)),
        onEditProject: (editProj) => dispatch(actions.editProject(editProj)),
        onDeleteProject: (deleteProj) => dispatch(actions.deleteProject(deleteProj)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Projects, axios));
