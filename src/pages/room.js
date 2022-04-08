import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { sendGet } from '../utils/api';

import { CornerBackButton } from '../components/button';
import white_arrow from '../images/right_arrow_white.svg';


export function Room() {
    let { roomId } = useParams();

    const [messages, setMessages] = useState([]);
    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();

    const fetchData = () => {
        sendGet(`chatroom/${roomId}}/messages`)
        .then((data) => {
            setMessages(data);
        })
        .catch((error) => {
            setIsError(true);
            console.log(error);
        });
    };

    useEffect(() => {
      fetchData();
    }, []);

    return (
        <div className='flex flex-column flex-grow align-center' >
            <div className='flex flex-row align-center' style={{
                width: '100%',
            }}>
                <div className='flex flex-grow page-title margin-40' >Room</div>
                <CornerBackButton onClick={() => navigate('/')}/>
            </div>

            <div className='flex flex-column flex-grow gap-20' style={{
                width: 540,
                marginBottom: 30
            }}>
                <div className='flex flex-column flex-grow' style={{
                    background: '#F5F6FA',
                    borderRadius: 16,
                    width: '100%'
                }}>

                </div>

                <div className='flex flex-row align-center' style={{
                    background: '#F5F6FA',
                    borderRadius: 16,
                    width: '100%'
                }}>


                    <textarea className='flex flex-grow ' rows="1" type='text' maxlength="500" placeholder="New message" style={{
                        border: 'none',
                        background: 'transparent',
                        paddingLeft: '20px',
                        paddingRight: '40px',
                        overflow: 'auto',
                        outline: 'none',
                        fontSize: 14,
                        lineHeight: 1.5,
                        maxWidth: '90%',
                        wordWrap: 'break-word',
                        wordBreak: 'break-all',
                        minHeight: '20px',
                        maxHeight: '200px'
                    }} />
                    <div className='flex corner-button' style={{
                        height: 28,
                        width: 28,
                        borderRadius: 14,
                        margin: 14,
                        cursor: 'pointer',
                        background: 'linear-gradient(to right, #455CFA, #1433FF)'
                    }}>
                        <img src={white_arrow} style={{
                            margin: 'auto'
                        }} />
                    </div>
                </div>
            </div>

        </div>
    )
}