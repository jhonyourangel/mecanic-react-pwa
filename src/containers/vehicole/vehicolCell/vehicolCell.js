import React from 'react'
import css from './vehicolCell.module.css'
import { MdPhone, MdEmail, MdTextsms, MdMessage, MdWhatshot} from 'react-icons/md';

// contact_phone
const VehicoleCell = (props
    // {plateNumber, 
    // plateNationality, 
    // carKm, 
    // owner, 
    // email, 
    // phoneNumber, 
    // brand, 
    // model, 
    // year,
    // clicked}
    ) => {
    const logoDomain = 'bmw'
   return (
             <div className={css.VehicolCell} onClick={props.clicked}>
                <div className={css.InfoContainer}>
                    <div className={css.Column1}>
                        <p className={css.PlateNumber}>RO-SV10RCE</p>
                        <p>225 000km</p>
                        <p>Ion Utale</p>
                    </div>
                    <div className={css.Column2}>
                        <p className={css.PlateNumber}>VW Passat Variant 2006</p>
                        <p className={css.PlateNumber}>WVWZZZ3CZ6E092524</p>
                        <p className={css.PlateNumber}>Exp. Assig.: 15/09/1019</p>
                        <p className={css.PlateNumber}>Urm. Intre. : 230 000km</p>
                    </div>
                </div>
                <div className={css.Bottom}>
                    <a href="tel:3248931565"><MdPhone/></a>
                    <a href="sms:3248931565"><MdTextsms/></a>
                    <a href="whatsapp:3248931565"><MdMessage/></a>
                    <a href="email:ion.utale@icloud.com"><MdEmail/> </a>
                </div>
            </div>

    )   
}

export default VehicoleCell
