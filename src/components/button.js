import React from 'react'

import './button.css'
import blue_bg from '../images/blue_bg.svg';
import blue_arrow from '../images/right_arrow_blue.svg';
import white_arrow from '../images/right_arrow_white.svg';


function Button(props) {
    return (
        <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between'
        }}>
            <div style={{
                margin: 'auto 20px'
            }}>
                {props.text}
            </div>
            <img src={props.icon} style={{
                margin: 'auto 20px',
                height: 20
            }} />
        </div>
    )
}


export function BlueButton(props) {
    return (
        <a onClick={props.onClick}>
            <div className='button blue-button' style={{
                backgroundImage: `url(${blue_bg})`,
                backgroundPosition: 'left -16px top -8px'
            }}>
                <Button text={props.text} icon={white_arrow} />
            </div>
        </a>
    )
}


export function WhiteButton(props) {
    return (
        <a onClick={props.onClick}>
            <div className='button white-button'>
                <Button text={props.text} icon={blue_arrow} />
            </div>
        </a>
    )
}

export function CornerBackButton(props) {
    return (
            <a onClick={props.onClick} className='flex corner-button'>
                <img src={white_arrow} style={{
                    transform: 'rotate(180deg)',
                    margin: 'auto'
                }} />
            </a>
    )
}

export function CornerMeButton(props) {
    return (
            <a onClick={props.onClick} className='flex corner-button'>
                <div style={{
                    color: 'white',
                    margin: 'auto'
                }}>Me</div>
            </a>
    )
}