import React from 'react'

import './new_message.css'
import white_arrow from '../images/right_arrow_white.svg';


export const NewMessageInput = (props) => {
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if (event.ctrlKey) {
                event.target.value += '\n';
            } else {
                event.preventDefault();
                props.onEnter(event);
            }
        }
    }

    const handleKeyUp = (event) => {
        event.target.style.height = 'inherit';
        event.target.style.height = `${Math.min(event.target.scrollHeight, 200)}px`; 
    }
    
    return (
        <div className='flex flex-row align-center content'>
            <textarea className='flex flex-grow new-text' rows="1" type='text' maxLength="500" placeholder="New message" 
                onKeyUp={handleKeyUp} onKeyDown={handleKeyDown} onChange={props.onChange}/>
            <div className='flex corner-button new-button'>
                <img src={white_arrow} style={{ margin: 'auto' }} onClick={props.onEnter} />
            </div>
        </div>
    );
  };