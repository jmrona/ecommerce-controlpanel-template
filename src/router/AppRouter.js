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
    const { role } = useSelector( state => state.users.auth);
    const { checking} = useSelector(state => state.auth);

    const dispatch = useDispatch();

    //DarkMode
    let dataTheme = localStorage.getItem('data-theme');

    useEffect(() => {
        dispatch( startChecking() );

        //DarkMode
        (dataTheme === 'dark')
        ? document.documentElement.setAttribute('data-theme', 'dark')
        : document.documentElement.setAttribute('data-theme', 'light');

    }, [dispatch, dataTheme])
    
    if( checking ){
        return (
            <div className="wrapper-auth">
                <div className="loadingScreen" style={{ color: 'white'}}>
                    <div className="lds-roller">
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
                    isAdmin={role}
                />
                <PublicRoute 
                    exact 
                    path="/register" 
                    component={RegisterScreen}
                    isAuthenticated={ !!token }
                    isAdmin={role}
                />
                <PublicRoute 
                    exact 
                    path="/recover" 
                    component={RecoverScreen}
                    isAuthenticated={ !!token }
                    isAdmin={role}
                />
                <PublicRoute 
                    exact 
                    path="/reset/:email" 
                    component={ResetPassword}
                    isAuthenticated={ !!token }
                    isAdmin={role}
                />

                <PrivateRoute
                    exact 
                    path="/"
                    component={Ecommerce}
                    isAuthenticated={ !!token }
                    isAdmin={role}
                />
                <Redirect to="/"/>
            </Switch>
        </Router>
    )
}
