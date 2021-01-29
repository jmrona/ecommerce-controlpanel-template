import React from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { startResetPassword } from '../../../actions/auth';
import { useForm } from '../../../hooks/useForm';
import { BtnSubmit } from '../../ui/Buttons/BtnSubmit';

export const ResetPassword = () => {
    const [ formReset, handleResetInputChange] = useForm({
        code: ''
    });
    const {code} = formReset;

    const {email} = useParams()
    const dispatch = useDispatch();

    const handleResetPassword = (e) => {
        e.preventDefault();
        dispatch(startResetPassword( email, code ));
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
