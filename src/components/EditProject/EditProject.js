import React, { Component } from 'react'
import Modal from '../Modal/Modal'
import Button from '../Button/Button'

class EditProject extends Component {
    defaultProj = {
        name: 'No Name',
        income: 0
    }
    state = {
        proj: {
           ...this.defaultProj
        }
    }

    componentDidMount() {
        this.setState({proj: (this.props.proj !== null) ? this.props.proj.proj : this.defaultProj})
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log('called nextprops:', nextProps.proj);      
        this.setState({proj: (nextProps.proj !== null) ? nextProps.proj : this.defaultProj})
    }

    inputOnChangeHandler(e) {
        console.log(e.target.name, e.target.value)
        this.setState({
            proj: {
                ...this.state.proj,
                [e.target.name]: e.target.value
            }
        })
    }

    prepareProjForUpload = () => {
        return {
            ...this.state.proj,
        }
    }

    render() {
        const proj = this.state.proj
        
        return (
            <Modal show={this.props.isModalVisible}>
                
                <fieldset>
                    <label htmlFor="name">Project Name </label>
                    <input 
                        id="name" 
                        name="name" 
                        type="text" 
                        value={proj.name}
                        onChange={(e) => this.inputOnChangeHandler(e)}/>
                    <br/>
                    <label htmlFor="income">Work End</label>
                    <input 
                        id="income" 
                        name="income" 
                        type="number" 
                        value={proj.income} 
                        onChange={(e) => this.inputOnChangeHandler(e)}/>
            </fieldset>

            <fieldset>
                <Button 
                btnType="Cancel"
                clicked={() => this.props.close()}
                >Cancel</Button>

                <Button 
                btnType="Success"
                clicked={() => this.props.save(proj)}
                >Save</Button>

                {this.state.proj._id !== undefined ? 
                <Button 
                btnType="Danger"
                clicked={() => this.props.delete(proj)}
                >Delete</Button> : null}
            </fieldset>
            </Modal>       
             )
    }
}

export default EditProject
