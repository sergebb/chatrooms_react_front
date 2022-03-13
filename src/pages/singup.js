import React from 'react'
import { CornerBackButton, BlueButton } from '../components/button';
import { LoginInput } from '../components/input';

import content_bg from '../images/content_bg.svg';

export function Singup() {
    return (
        <div className='flex_card' style={{
            backgroundImage: `url(${content_bg})`,
        }}>
            <CornerBackButton />
            <div className='flex_row_center'>
                <div className='flex_content'>
                    <div className='page_title'>Sign up</div>
                    <LoginInput error='This is email error' title='Email Address' text='me@email.com' />
                    <LoginInput title='Username' text='seagul111' />
                    <LoginInput title='Password' text='seagul111' password />
                    <LoginInput title='Confirm Password' text='seagul111' password />
                    <div></div>
                    <BlueButton text='Sign up' />
                </div>
            </div>
        </div>
    )
}