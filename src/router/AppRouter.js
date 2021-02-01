import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Switch, BrowserRouter as Router, } from 'react-router-dom'
import { startChecking } from '../actions/auth'

import { LoginScreen } from '../components/pages/auth/LoginScreen'
import { RecoverScreen } from '../components/pages/auth/RecoverScreen'
import { RegisterScreen } from '../components/pages/auth/RegisterScreen'
import { ResetPassword } from '../components/pages/auth/ResetPassword'
import { Ecommerce } from '../Ecommerce'
import { PrivateRoute } from './PrivateRouter'
import { PublicRoute } from './PublicRouter'


export const AppRouter = () => {
    const { token } = useSelector(state => state.token);
    const { checking } = useSelector(state => state.auth);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch( startChecking() )
    }, [dispatch])
    
    if( checking ){
        return (
            <div className="wrapper-auth">
                <div className="loadingScreen" style={{ color: 'white'}}>
                    <div class="lds-roller">
                        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                    </div>
                    <h2>Loading...</h2>
                </div>
            </div>
        );
    }

    return (
        <Router>
            <Switch>
                <PublicRoute 
                    exact 
                    path="/login" id
                    component={LoginScreen}
                    isAuthenticated={ !!token }
                />
                <PublicRoute 
                    exact 
                    path="/register" 
                    component={RegisterScreen}
                    isAuthenticated={ !!token }
                />
                <PublicRoute 
                    exact 
                    path="/recover" 
                    component={RecoverScreen}
                    isAuthenticated={ !!token }
                />
                <PublicRoute 
                    exact 
                    path="/reset/:email" 
                    component={ResetPassword}
                    isAuthenticated={ !!token }
                />

                <PrivateRoute
                    exact 
                    path="/"
                    component={Ecommerce}
                    isAuthenticated={ !!token }
                />
                <Redirect to="/"/>
            </Switch>
        </Router>
    )
}
