import React from 'react'
import { useNavigate } from "react-router-dom";
import { WhiteButton, BlueButton } from '../components/button';

import index_bg from '../images/index_bg.svg';


export function Login() {
    const navigate = useNavigate();

    return (
        <div className='flex flex-column flex-grow' style={{
            backgroundImage: `url(${index_bg})`,
            backgroundRepeat: 'no-repeat'
        }}>
            <div className='index-title'>Welcome</div>
            <div className='flex flex-grow'></div>
            <div className='flex flex-column align-center margin-40 gap-20'>
                <WhiteButton text='Sign in' onClick={() => navigate('/signin')} />
                <BlueButton text='Sign up' onClick={() => navigate('/signup')} />
            </div>
        </div>
    )
}