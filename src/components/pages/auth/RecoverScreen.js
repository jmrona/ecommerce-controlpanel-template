import React from 'react'
import { BtnSubmit } from '../../ui/Buttons/BtnSubmit'
import { useForm } from '../../../hooks/useForm';
import { startRecover } from '../../../actions/auth';
import { useDispatch } from 'react-redux';

export const RecoverScreen = ({history}) => {
    const [ formRecover, handleRecoverInputChange] = useForm({
        email: 'jm_rona@hotmail.com'
    });

    const { email } = formRecover;
    const dispatch = useDispatch();

    const handleRecover = (e) => {
        e.preventDefault();
        dispatch(startRecover( email ))
        history.push('/reset/'+email)
    }

    return (
        <div className="wrapper-auth">
            <div className="container-auth">
                <div className="content">
                    <div className="logo">
                        JMRONA
                    </div>
                    <form className="auth" method="POST" onSubmit={handleRecover}>
                        <div className="row-auth">
                            <label htmlFor="email">Email:</label>
                            <input 
                                type="text" 
                                name="email" 
                                value={email}
                                onChange={handleRecoverInputChange}
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
