import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import css from './maintenanceCell.module.css'

import moment from 'moment'

class MaintenanceCell extends Component {
    render() {
        const {
            creationDate,
            editDate,
            createdBy,
            products,
            category,
            plateNumber,
            vin,
            carKm,
            note,
            _id
            } = this.props.maintenance;
        
        return (
            <article className={css.MaintenanceCell}>
                <Link to={`/intretinere/${_id}`}>
                    <section>
                        <h3>{plateNumber}</h3>
                        <p className={css.CreationDate}>{moment(creationDate).format('DD MMM YYYY')}</p>
                    </section>
                    <section>
                        <p>km: {carKm}</p>
                    </section>
                </Link>
            </article>
        )
    }
}

export default MaintenanceCell
