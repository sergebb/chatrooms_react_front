import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { sendGet, sendPost, sendDelete } from '../utils/api';

import { CornerBackButton } from '../components/button';
import { NewMessageInput } from '../components/new_message';


export function Room() {
    let { roomId } = useParams();

    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [lastMessage, setLastMessage] = useState(0);
    const [newMessage, setNewMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();

    const getName = () => {
        sendGet(`chatroom/${roomId}`)
        .then((data) => {
            setRoomName(data.name);
        })
        .catch((error) => {
            setIsError(true);
            console.log(error);
        });
    }

    const getMessages = () => {
        sendGet(`chatroom/${roomId}/messages`)
        .then((data) => {
            if (data.length) {
                setMessages(data);
                setLastMessage(data[data.length - 1].id)
            }
        })
        .catch((error) => {
            setIsError(true);
            console.log(error);
        });
    }

    const enterRoom = () => {
        sendPost(`chatroom/${roomId}/users`)
        .then((data) => {       
            getMessages();
        })
        .catch((error) => {
            setIsError(true);
            console.log(error);
        });
    }

    const leaveRoom = () => {
        sendDelete(`chatroom/${roomId}/users`)
        .catch((error) => {
            setIsError(true);
            console.log(error);
        });

        navigate('/');
    }

    const sendMessage = (event) => {
        let trimMessage = newMessage.replace('/[\r\n\x0B\x0C\u0085\u2028\u2029]+/g', " ").trim();
        if (trimMessage.length === 0) {
            return;
        }
        sendPost(`chatroom/${roomId}/messages`, {text: trimMessage})
        .then(() => updateMessages())
        .catch((error) => {
            setIsError(true);
            console.log(error);
        });

        setNewMessage('')
        event.target.value = ''
    }

    const updateMessages = () => {
        sendGet(`chatroom/${roomId}/messages` + '?lastMessage=' + lastMessage)
        .then((data) => {
            if (data) {
                setMessages(messages.concat(data));
                setLastMessage(data[data.length - 1].id)
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        getName();
        enterRoom();

        const interval = setInterval(() => updateMessages(), 2000);
        return () => clearInterval(interval);
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
                    {isError && <div>Error fetching data.</div>}
                    {!messages.length && <div style={{color: 'gray'}}>You can be first here!</div>}
                    {messages && messages.map((item, index) => (
                        <div key={index}>
                            <span style={{fontWeight: 'bold'}}>{item.user}</span>: {item.text}
                        </div>
                    ))}
                </div>

                <NewMessageInput onEnter={sendMessage} onChange={(event) => setNewMessage(event.target.value)} />
            </div>

        </div>
    )
}