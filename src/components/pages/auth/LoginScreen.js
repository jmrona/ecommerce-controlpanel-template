import React, { useState } from 'react'
import { useForm } from '../../../hooks/useForm';
import { startLogin } from '../../../actions/auth';

import { useDispatch } from 'react-redux';
import { BtnSubmit } from '../../ui/Buttons/BtnSubmit';


export const LoginScreen = () => {
    
    const [visible, setVisible] = useState(false);
    
    const isVisible = (e) =>{
        e.preventDefault();
        setVisible(!visible);
    }

    const [ formLoginValues, handleLoginInputChange] = useForm({
        email: '',
        password: ''
    });

    const { email, password } = formLoginValues;
    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLogin( email, password ));
    }

    return (
        <div className="wrapper-auth">
            <div className="container-auth">
                <div className="content">
                    <div className="logo">
                        JMRONA
                    </div>
                    <form className="auth" onSubmit={handleLogin}>
                        <div className="row-auth">
                            <label htmlFor="email">Email:</label>
                            <input 
                                type="text" 
                                name="email" 
                                value={email}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="row-auth position-relative">
                            <label htmlFor="password">Password:</label>
                            <input type={ visible ? "text" : "password"} 
                                name="password" 
                                value={password}
                                onChange={handleLoginInputChange}
                                />
                            <button className="visible" onClick={isVisible}>
                                {
                                    visible 
                                    ? <i className="far fa-eye"></i>
                                    : <i className="far fa-eye-slash"></i>
                                }
                            </button>
                        </div>
                        <div className="row-auth justify-content-center">
                            <BtnSubmit outline color="blue" sm="10" md="10" css="">
                                Login
                            </BtnSubmit>
                        </div>
                        <div className="row-auth">
                            <div className="auth-footer">
                                <a href="/register">Don't you have an account already? Register</a>
                                <a href="/recover">I forgot my password</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
