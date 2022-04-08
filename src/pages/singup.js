import React, { useState } from 'react'
import validator from 'validator'
import { useNavigate } from 'react-router-dom'

import { CornerBackButton, BlueButton } from '../components/button';
import { LoginInput } from '../components/input';

import { authPost } from '../utils/api';
import { saveToken } from '../utils/auth';

import content_bg from '../images/content_bg.svg';


export function Singup() {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")

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

    const trySignup = () => {
        setErrors({
            email: '',
            username: '',
            password: '',
            password2: ''
        });

        if (!email) {
            setErrors({ email: 'Empty Email address' });
            return;
        } else if (!validator.isEmail(email)) {
            setErrors({ email: 'Invalid Email address' });
            return;
        }

        if (!username) {
            setErrors({ username: 'Empty username' });
            return;
        }

        if (password.length < 8) {
            setErrors({ password: 'Password is too short' });
            return;
        }

        if (password !== password2) {
            setErrors({ password2: 'Passwords do not match' });
            return;
        }

        authPost('users/', {
            email: email,
            username: username,
            password: password
        })
            .then(res => {
                if (res.id) {
                    authPost("token/login", { "username": username, "password": password })
                        .then((login_res) => {
                            console.log('login_res', login_res)
                            saveToken(login_res);
                            navigate("/");
                        })
                        .catch(err => { console.log(err) })
                } else {
                    let new_errors = {}
                    if (res.username) {
                        new_errors.username = res.username[0]
                    }
                    if (res.email) {
                        new_errors.email = res.email[0]
                    }
                    if (res.password) {
                        new_errors.password = res.password[0]
                    }
                    setErrors(new_errors);
                    return;
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
                    <div className='page-title margin-background'>Sign up</div>
                    <form>
                        <LoginInput title='Email Address'
                            error={errors.email}
                            onEnter={handleEnter}
                            onChange={(event) => setEmail(event.target.value)} />
                        <LoginInput title='Username'
                            error={errors.username}
                            onEnter={handleEnter}
                            onChange={(event) => setUsername(event.target.value)} />
                        <LoginInput title='Password' password
                            error={errors.password}
                            onEnter={handleEnter}
                            onChange={(event) => setPassword(event.target.value)} />
                        <LoginInput title='Confirm Password' password
                            error={errors.password2}
                            onEnter={trySignup}
                            onChange={(event) => setPassword2(event.target.value)} />
                    </form>
                </div>
            </div>
            <div className='flex flex-grow'></div>
            <div className='margin-40'>
                <BlueButton text='Sign up' onClick={trySignup} />
            </div>
        </div>
    )
}