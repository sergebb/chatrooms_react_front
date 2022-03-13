import React from 'react'
import { WhiteButton, BlueButton } from '../components/button';

import index_bg from '../images/index_bg.svg';


export function Index() {
    return (
        <div className='flex_card' style={{
            backgroundImage: `url(${index_bg})`,
        }}>
            <div className='index_title'>Welcome</div>
            <div className='flex_row_center'>
                <div className='flex_content'>
                    <WhiteButton text='Sign in' />
                    <BlueButton text='Sign up' />
                </div>
            </div>
        </div>
    )
}