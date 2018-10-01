import React from 'react'
import css from './vehicolCell.module.css'
import { MdPhone, MdEmail, MdTextsms, MdMessage } from 'react-icons/md';
import { Link } from 'react-router-dom'
import Rowcell from '../../../components/rowcell/rowcell';

// contact_phone
const VehicoleCell = (props) => {
    const {
            plateNumber, 
            plateNationality, 
            carKm, 
            owner, 
            email, 
            phoneNumber, 
            brand, 
            model, 
            year,
            vin,
            clicked
        } = props.vehicle

    
   return (
       <Rowcell>
            <Link to={'/vehicol/' + plateNumber} style={{ textDecoration: 'none' }}>
                <div className={css.InfoContainer}>
                    <div className={css.Column1}>
                        <p className={css.PlateNumber}>{plateNumber}</p>
                        <p className={css.CarKm}>{carKm}</p>
                        <p className={css.Owner}>{owner}</p>
                    </div>
                    <div className={css.Column2}>
                        <p className={css.BrandModelYear}>{brand} {model} {year}</p>
                        <p className={css.Vin}>{vin || 'fara sasiu'}</p>
                        <p className={css.NextMaintenance}>Urm. Intre. : 230 000km</p>
                    </div>
                </div>
            </Link>
                <div className={css.Bottom}>
                    <a href={`tel:${phoneNumber}`}><MdPhone/></a>
                    <a href={`sms:${phoneNumber}`}><MdTextsms/></a>
                    <a href={`whatsapp:${phoneNumber}`}><MdMessage/></a>
                    <a href={`email:{email}`}><MdEmail/> </a>
                </div>
       </Rowcell>

    )   
}



export default VehicoleCell
