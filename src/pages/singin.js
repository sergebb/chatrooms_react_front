import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { CornerBackButton, BlueButton } from '../components/button';
import { LoginInput } from '../components/input';

import { authForm } from '../utils/api';
import { saveToken } from '../utils/auth';

import content_bg from '../images/content_bg.svg';


export function Singin() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [errors, setErrors] = React.useState({});

    const navigate = useNavigate();

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            const form = event.target.form;
            const index = [...form].indexOf(event.target);
            form.elements[index + 1].focus();
            event.preventDefault();
        }
    }

    const trySignin = () => {
        setErrors({
            username: '',
            password: '',
        });

        if (!username) {
            setErrors({ username: 'Empty username' });
            return;
        }

        if (password.length < 8) {
            setErrors({ password: 'Password is too short' });
            return;
        }

        authForm("token/login", { "username": username, "password": password })
            .then((data) => {
                if (data.access_token) {
                    saveToken(data);
                    navigate("/");
                } else {
                    console.log('Error login: ', data)
                    setErrors({ password: 'Invalid username or password' });
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
                    <div className='page-title margin-background'>Sign in</div>
                    <form>
                        <LoginInput title='Username'
                            error={errors.username}
                            onChange={(event) => setUsername(event.target.value)} 
                            onEnter={handleEnter} />
                        <LoginInput title='Password' password
                            error={errors.password}
                            onChange={(event) => setPassword(event.target.value)} 
                            onEnter={trySignin} />
                    </form>
                    <a href='#shame' onClick={(event) => alert('Shame on you!')}
                        style={{
                            fontSize: 16,
                            color: '#2B47FC',
                            cursor: 'pointer'
                        }}>
                        Forgot password?
                    </a>
                </div>
            </div>

            <div className='flex flex-grow'></div>
            <div className='margin-40'>
                <BlueButton text='Sign in' onClick={trySignin} />
            </div>
        </div>
    )
}