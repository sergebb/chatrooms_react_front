import React from 'react'

import './button.css'
import eye from '../images/eye.svg'
import eye_close from '../images/eye_close.svg'


export function LoginInput(props) {
    const title_color = props.error ? '#FD2727' : '#B9B9B9';
    const line_color = props.error ? '#FD2727' : '#5D72FD';
    const err_display = props.error ? 'show' : 'none';

    return (
        <div>
            <div style={{
                padding: '5px',
                fontSize: 14,
                color: title_color
            }}>{props.title}</div>
            <div style={{
                borderBottom: '1px solid ' + line_color,
                width: 400,
            }}>
                <input type={props.password ? 'password': 'text'} style={{
                    border: 'none',
                    padding: '5px',
                    outline: 'none',
                    fontSize: 14,
                    width: '90%'
                }} defaultValue={props.text} />
                <img src={eye} alt='show' style={{
                    display: props.password ? 'show': 'none'
                }} />
            </div>
            <div style={{
                padding: '5px',
                fontSize: 13,
                color: '#FD2727',
                display: err_display
            }}>{props.error}</div>
        </div>
    )
}

