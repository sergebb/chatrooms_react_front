import React from 'react'
import index_bg from '../images/index_bg.svg';

import { WhiteButton, BlueButton } from '../components/button';

export function Index() {
    return (
        <div className='index_bg' style={{
            backgroundImage: `url(${index_bg})`,
            backgroundSize: "800px",
            backgroundRepeat: 'no-repeat',
            height: '700px',
            backgroundPosition: 'left -100px top -40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
            <div style={{
                paddingTop: 160,
                paddingLeft: 40,
                fontSize: 28,
                color: 'white'
            }}>Welcome</div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    margin: '40px auto',
                    gap: 20
                }}>
                    <WhiteButton text='Sign in' />

                    <BlueButton text='Sign up' />
                </div>
            </div>
        </div>
    )
}