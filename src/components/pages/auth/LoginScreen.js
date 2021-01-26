import React, { useState } from 'react'
import { Btn } from '../../ui/Buttons/Btn';

export const LoginScreen = () => {
    
    const [visible, setVisible] = useState(false);
    
    const isVisible = (e) =>{
        e.preventDefault();
        setVisible(!visible);
    }

    return (
        <div className="wrapper-auth">
            <div className="container-auth">
                <div className="content">
                    <div className="logo">
                        JMRONA
                    </div>
                    <form className="auth">
                        <div className="row-auth">
                            <label htmlFor="email">Email:</label>
                            <input type="text" name="email" value="test"/>
                        </div>
                        <div className="row-auth">
                            <label htmlFor="password">Password:</label>
                            <input type={ visible ? "text" : "password"} name="password" value="123456"/>
                            <button className="visible" onClick={isVisible}>
                                {
                                    visible 
                                    ? <i className="far fa-eye"></i>
                                    : <i className="far fa-eye-slash"></i>
                                }
                            </button>
                        </div>
                        <div className="row-auth justify-content">
                            <Btn href="#" outline color="blue" sm="10" md="10" css="">Log in</Btn> 
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
