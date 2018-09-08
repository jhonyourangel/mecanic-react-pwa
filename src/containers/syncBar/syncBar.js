import React, { Component } from 'react'
import css from './syncBar.module.css'

class SyncBar extends Component {

    componentDidMount() {

    }

    refreshPage = () => {
        window.location.reload(false)
    }

    render() {
        return (
            <div className={css.SyncBar}>
                <div>
                    <button onClick={() => this.refreshPage()}>refresh</button>
                </div>
            </div>
        )
    }
}

export default SyncBar
