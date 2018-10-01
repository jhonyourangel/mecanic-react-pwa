import React, { Component } from 'react'
import css from './searchBar.module.css'

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
            <fieldset className={css.form_wrapper}>
                <input onChange={e => this.valueChanged(e)} value={this.state.value} type="text" name="search" placeholder="Cauta..."/>
                <button onClick={() => this.props.onChange(this.state.value)}><MdSearch  style={{marginBottom: '-5px'}}/></button>
            </fieldset>
        )
    }
}

export default SearchBar
