import React, { Component } from 'react'
import css from './syncBar.module.css'

class SyncBar extends Component {

    componentDidMount() {

    }

    refreshPage = () => {
        //window.location.reload(false)
        window.self.addEventListener('fetch', event => {
            debugger
            console.log('window.self: fetch called--', event)
        })

        fetch('/api/pwa/vehicle').then(console.log).catch(console.log)
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
