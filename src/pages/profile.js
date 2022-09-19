import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { CornerBackButton, WhiteButton } from '../components/button';
import { LoginInput } from '../components/input';

import { authGet, authPost } from '../utils/api';

import content_bg from '../images/content_bg.svg';
import { removeToken } from '../utils/auth';


export function Profile() {
    const [data, setData] = useState({email: '', username: ''});
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();

    const fetchData = () => {
        authGet('users/me/')
        .then((data) => {
          setIsLoading(false);
          setData(data);
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

    const tryLogout = () => {
        removeToken();
        navigate('/');
    };

    return (
        <div className='flex flex-column flex-grow align-center' style={{
            backgroundImage: `url(${content_bg})`,
            backgroundRepeat: 'no-repeat'
        }}>
            <CornerBackButton onClick={() => navigate('/')} />
            <div className='flex flex-row justify-center'>
                <div className='flex flex-column gap-20'>
                    <div className='page-title margin-background'>Profile</div>
                    {isError && <div>Error fetching data.</div>}
                    <LoginInput title='Email' readonly={true} text={data.email}/>
                    <LoginInput title='Username' readonly={true} text={data.username}/>
                </div>
            </div>

            <div className='flex flex-grow'></div>
            <div className='margin-40'>
                <WhiteButton text='Sign out' onClick={tryLogout} />
            </div>
        </div>
    )
}