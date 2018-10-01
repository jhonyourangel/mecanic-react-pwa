import React, { Component } from 'react'
import css from './searchBar.module.css'
import { Link } from 'react-router-dom'
import { MdAddCircle } from 'react-icons/md';

import { MdSearch } from 'react-icons/md';

class SearchBar extends Component {

    state = {
        value: ''
    }

    valueChanged = (e) => {
        this.setState({value: e.target.value})
        this.props.onChange(e.target.value)
    }

    render() {
        return (
            <div className={css.ToolBar}>
                <Link to={this.props.to}> 
                    <MdAddCircle />
                </Link>
                <fieldset className={css.form_wrapper}>
                    <input onChange={e => this.valueChanged(e)} value={this.state.value} type="text" name="search" placeholder="Cauta..."/>
                    <button onClick={() => this.props.onChange(this.state.value)}><MdSearch  style={{marginBottom: '-5px'}}/></button>
                </fieldset>
            </div>
        )
    }
}

export default SearchBar
