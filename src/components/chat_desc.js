import React from 'react'

import './chat_desc.css'
import right_arrow_blue from '../images/right_arrow_blue.svg'


export const ChatDesc = (props) => {
    
    return (
        <div className='chat-content' onClick={props.onClick}>
            <div className='flex-grow'>
                <div className='chat-title'>{props.title}</div>
                <div >
                    <span className='chat-user'>{props.user && props.user + ': '}</span>
                    <span className='chat-message'>{props.message}</span>
                </div>
            </div>
            <img src={right_arrow_blue} alt='show' />
        </div>
    );
  };