import React from 'react'
import css from './CheckIcon.css'
import Aux from '../../hoc/Aux/Aux'

const CheckIcon = (props) => {
    let icon
    switch (props.type) {
        case 'billed':
            icon = (
                <svg className={css.CheckIcon} version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 132 132">
                    <circle className="path circle" fill="none" stroke="#73AF55" strokeWidth="10" strokeMiterlimit="10" cx="65.1" cy="65.1" r="62.1" />
                    <polyline className="path check" fill="none" stroke="#73AF55" strokeWidth="10" strokeLinecap="round" strokeMiterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 " />
                </svg>
            )
            break;

        case 'loading':
            icon = (
                <svg className={css.Loading} 
                 xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" 
                viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" 
                style={{background: "none"}}>
                <g transform="rotate(0 50 50)">
                    <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#1D3557">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate>
                    </rect>
                </g><g transform="rotate(30 50 50)">
                        <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#1D3557">
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate>
                        </rect>
                    </g><g transform="rotate(60 50 50)">
                        <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#1D3557">
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate>
                        </rect>
                    </g><g transform="rotate(90 50 50)">
                        <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#1D3557">
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>
                        </rect>
                    </g><g transform="rotate(120 50 50)">
                        <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#1D3557">
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate>
                        </rect>
                    </g><g transform="rotate(150 50 50)">
                        <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#1D3557">
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate>
                        </rect>
                    </g><g transform="rotate(180 50 50)">
                        <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#1D3557">
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate>
                        </rect>
                    </g><g transform="rotate(210 50 50)">
                        <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#1D3557">
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate>
                        </rect>
                    </g><g transform="rotate(240 50 50)">
                        <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#1D3557">
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate>
                        </rect>
                    </g><g transform="rotate(270 50 50)">
                        <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#1D3557">
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate>
                        </rect>
                    </g><g transform="rotate(300 50 50)">
                        <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#1D3557">
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate>
                        </rect>
                    </g><g transform="rotate(330 50 50)">
                        <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#1D3557">
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate>
                        </rect>
                    </g></svg>
            )
            break;

        // not billed case
        default:
            icon = (
                <svg className={css.CheckIcon} version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                    <circle className="path circle" fill="none" stroke="#D06079" strokeWidth="6" strokeMiterlimit="10" cx="65.1" cy="65.1" r="62.1" />
                    <line className="path line" fill="none" stroke="#D06079" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" x1="34.4" y1="37.9" x2="95.8" y2="92.3" />
                    <line className="path line" fill="none" stroke="#D06079" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" x1="95.8" y1="38" x2="34.4" y2="92.2" />
                </svg>
            )
    }

    return (

        <Aux>
            {icon}
        </Aux>
    )
}

export default CheckIcon
