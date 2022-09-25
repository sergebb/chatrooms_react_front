import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { sendGet } from '../utils/api';

import { CornerMeButton, BlueButton } from '../components/button';
import { ChatDesc } from '../components/chat_desc';

import content_bg from '../images/content_bg.svg';


export function Chatrooms() {
    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();

    const fetchData = () => {
        sendGet('chatroom')
        .then((data) => {
          setIsLoading(false);
          setRooms(data);
        })
        .catch((error) => {
          setIsLoading(false);
          setIsError(true);
          console.log(error);
        });
    };

    useEffect(() => {
      fetchData();
    }, []);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
        <div className='flex flex-column flex-grow align-center' style={{
            backgroundImage: `url(${content_bg})`,
            backgroundRepeat: 'no-repeat'
        }}>
            <CornerMeButton onClick={() => navigate('/profile')}/>
            <div className='flex flex-row justify-center'>
                <div className='flex flex-column gap-20'>
                    <div className='page-title margin-background'>Chatrooms</div>
                    <div style={{
                        overflowY: 'auto',
                        height: 360
                    }}>
                        {isError && <div>Error fetching data.</div>}
                        {rooms && rooms.map((item, index) => (
                            <div key={index}>
                                <ChatDesc title={item.name} onClick={() => navigate('room/' + item.name)}
                                    user={item.last_message && item.last_message.user} 
                                    message={item.last_message && item.last_message.text}   />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='flex flex-grow'></div>
            <div className='margin-40'>
                <BlueButton text='Create chatroom' onClick={() => navigate('/create')}/>
            </div>
        </div>
    )
}