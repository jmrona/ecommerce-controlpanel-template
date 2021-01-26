import React from 'react'
import { Btn } from '../../ui/Buttons/Btn'

export const RecoverScreen = () => {
    return (
        <div className="wrapper-auth">
            <div className="container-auth">
                <div className="content">
                    <div className="logo">
                        JMRONA
                    </div>
                    <form className="auth" method="GET">
                        <div className="row-auth">
                            <label htmlFor="email">Email:</label>
                            <input type="text" name="email" value="test"/>
                        </div>
                        <div className="row-auth justify-content">
                            <Btn href="#" outline color="blue" sm="10" md="10" css="">
                                Recover password
                            </Btn> 
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
