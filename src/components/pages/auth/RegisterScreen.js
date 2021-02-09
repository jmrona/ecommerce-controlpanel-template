import React, { useState } from 'react'

import { useDispatch } from 'react-redux';
import { useForm } from '../../../hooks/useForm';
import { startRegister } from '../../../actions/auth';
import { BtnSubmit } from '../../ui/Buttons/BtnSubmit';

export const RegisterScreen = () => {
    const [visible, setVisible] = useState(false);
    
    const isVisible = (e) =>{
        e.preventDefault();
        setVisible(!visible);
    }

    const [ formRegisterValues, handleRegisterInputChange] = useForm({
        name: '',
        lastname: '',
        email: '',
        password: ''
    });

    const { name, lastname, email, password } = formRegisterValues;
    const dispatch = useDispatch();
    
    const handleRegister = (e) => {
        e.preventDefault();
        dispatch(startRegister( name, lastname, email, password ));
    }

    return (
        <div className="wrapper-auth">
            <div className="container-auth">
                <div className="content">
                    <div className="logo">
                        JMRONA
                    </div>
                    <form className="auth" onSubmit={ handleRegister }>
                        <div className="row-auth">
                            <label htmlFor="name">Name:</label>
                            <input type="text" name="name" value={name} onChange={handleRegisterInputChange}/>
                        </div>
                        <div className="row-auth">
                            <label htmlFor="lastname">Lastname:</label>
                            <input type="text" name="lastname" value={lastname} onChange={handleRegisterInputChange}/>
                        </div>
                        <div className="row-auth">
                            <label htmlFor="email">Email:</label>
                            <input type="text" name="email" value={email} onChange={handleRegisterInputChange}/>
                        </div>
                        <div className="row-auth">
                            <label htmlFor="password">Password:</label>
                            <input type={ visible ? "text" : "password"} name="password" value={password} onChange={handleRegisterInputChange}/>
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
                                Register
                            </BtnSubmit>
                        </div>
                        <div className="row-auth">
                            <div className="auth-footer">
                                <a href="/login">Do you have an account already? Log in</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
