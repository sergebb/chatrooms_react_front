import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { CornerBackButton, BlueButton } from '../components/button';
import { LoginInput } from '../components/input';

import { sendPost } from '../utils/api';

import content_bg from '../images/content_bg.svg';


function Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function CreateChatroom() {
    const [roomname, setRoomname] = useState("")
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const tryCreate = () => {

        if (!roomname) {
            setError('Empty name');
            return;
        }

        sendPost("chatroom", { "name": Capitalize(roomname) })
            .then((data) => {
                if (data.id) {
                    navigate("/");
                } else {
                    console.log('Error create: ', data)
                    if (data.name) {
                        setError(data.name[0]);
                    } else {
                        setError('Error creating a chatroom');
                    }
                }
            })
            .catch(err => { console.log(err) })
    };

    return (
        <div className='flex flex-column flex-grow align-center' style={{
            backgroundImage: `url(${content_bg})`,
            backgroundRepeat: 'no-repeat'
        }}>
            <CornerBackButton onClick={() => navigate('/')} />
            <div className='flex flex-row justify-center'>
                <div className='flex flex-column gap-20'>
                    <div className='page-title margin-background'>Create chatroom</div>
                    <LoginInput title='Name'
                        error={error}
                        onChange={(event) => setRoomname(event.target.value)} 
                        onEnter={tryCreate} />
                </div>
            </div>

            <div className='flex flex-grow'></div>
            <div className='margin-40'>
                <BlueButton text='Create' onClick={tryCreate} />
            </div>
        </div>
    )
}