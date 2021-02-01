import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import { startResetPassword } from '../../../actions/auth';
import { useForm } from '../../../hooks/useForm';
import { BtnSubmit } from '../../ui/Buttons/BtnSubmit';

export const ResetPassword = () => {

    const [visible, setVisible] = useState(false);
    
    const isVisible = (e) =>{
        e.preventDefault();
        setVisible(!visible);
    }

    const [ formReset, handleResetInputChange] = useForm({
        code: '',
        newPassword: ''
    });
    const {code, newPassword} = formReset;

    const {email} = useParams()
    const dispatch = useDispatch();
    const history = useHistory;
    const handleResetPassword = (e) => {
        e.preventDefault();
        dispatch(startResetPassword( email, code, newPassword ));
        history.pushState('/');
    }

    return (
        <div className="wrapper-auth">
            <div className="container-auth">
                <div className="content">
                    <div className="logo">
                        JMRONA
                    </div>
                    <form className="auth" method="POST" onSubmit={handleResetPassword}>
                        <div className="row-auth">
                            <label htmlFor="Code">Code:</label>
                            <input 
                                type="text" 
                                name="code" 
                                value={code}
                                onChange={handleResetInputChange}
                            />
                        </div>
                        <div className="row-auth">
                            <label htmlFor="newPassword">New password:</label>
                            <input type={ visible ? "text" : "password"} 
                                name="newPassword" 
                                value={newPassword}
                                onChange={handleResetInputChange}
                                />
                            <button className="visible" onClick={isVisible}>
                                {
                                    visible 
                                    ? <i className="far fa-eye"></i>
                                    : <i className="far fa-eye-slash"></i>
                                }
                            </button>
                        </div>
                        <div className="row-auth justify-content">
                            <BtnSubmit outline color="blue" sm="10" md="10" css="">
                                Recover password
                            </BtnSubmit>
                        </div>
                        <div className="row-auth">
                            <div className="auth-footer">
                                <a href="/login">I know my password, Login</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
