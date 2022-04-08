import React from 'react'

import './input.css'
import eye from '../images/eye.svg'
import eye_close from '../images/eye_close.svg'


export const LoginInput = (props) => {
    const [values, setValues] = React.useState({
      password: "",
      showPassword: props.password ? false : true,
    });
    
    const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
    };
    
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            props.onEnter(event);
        }
    }
    
    return (
        <div>
            <div className={"input-title " + (props.error ? 'err-color' : '')} >
                {props.title}
            </div>
            <div className={"input-content " + (props.error ? 'err-color' : '')} >
                <input className="input-text"
                    type={values.showPassword ? "text" : "password"}
                    readOnly={props.readonly}
                    onChange={props.onChange}
                    onKeyDown={handleKeyDown}
                    defaultValue={props.text}
                    value={props.password ? values.text : props.text} />
                <img alt='show' 
                    src={ values.showPassword ? eye_close : eye }
                    style={{ display: props.password ? 'show': 'none'}}
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword} />
            </div>
            { props.error &&
                <div className='input-err err-color'>
                    {props.error}
                </div>
            }
        </div>
    );
  };