import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { connectWebsocket } from '../utils/api';

import { CornerBackButton } from '../components/button';
import { NewMessageInput } from '../components/new_message';


export function Room() {
    let { roomName } = useParams();

    const [messages, setMessages] = useState([]);
    const [webscoket, setWebsocket] = useState();
    const [newMessage, setNewMessage] = useState("");
    const navigate = useNavigate();

    const leaveRoom = () => {
        navigate('/');
    }

    const sendMessage = (event) => {
        let trimMessage = newMessage.replace('/[\r\n\x0B\x0C\u0085\u2028\u2029]+/g', " ").trim();
        if (trimMessage.length === 0) {
            return;
        }
        webscoket.send(trimMessage)

        event.target.value = ''
    }


    useEffect(() => {
        if (!webscoket){
            let ws = connectWebsocket(`chatroom/${roomName}/ws`);

            ws.onmessage = (recieved) => {
                setMessages((messages) => [...messages, JSON.parse(recieved.data)]);
            };

            setWebsocket(ws)
        }

    }, []);

    return (
        <div className='flex flex-column flex-grow align-center' >
            <div className='flex flex-row align-center' style={{
                width: '100%',
            }}>
                <div className='flex flex-grow page-title margin-40' >{roomName}</div>
                <CornerBackButton onClick={leaveRoom}/>
            </div>

            <div className='flex flex-column gap-20' style={{
                width: 540,
                marginBottom: 30,
                height: 710
            }}>
                <div className='flex flex-column flex-grow' style={{
                    background: '#F5F6FA',
                    borderRadius: 16,
                    padding: 16,
                    lineHeight: 1.5,
                    overflowY: 'auto',
                }}>
                    {!messages.length && <div style={{color: 'gray'}}>You can be first here!</div>}
                    {messages && messages.map((item, index) => (
                        <div key={index}>
                            <span style={{fontWeight: 'bold'}}>{item.user}</span>: {item.data}
                        </div>
                    ))}
                </div>

                <NewMessageInput onEnter={sendMessage} onChange={(event) => setNewMessage(event.target.value)} />
            </div>

        </div>
    )
}