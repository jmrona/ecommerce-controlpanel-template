import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Switch, BrowserRouter as Router, } from 'react-router-dom'
import { startChecking, startLogout } from '../actions/auth'

import { LoginScreen } from '../components/pages/auth/LoginScreen'
import { RecoverScreen } from '../components/pages/auth/RecoverScreen'
import { RegisterScreen } from '../components/pages/auth/RegisterScreen'
import { ResetPassword } from '../components/pages/auth/ResetPassword'
import { Admin } from '../Admin'
import { PrivateRoute } from './PrivateRouter'
import { PublicRoute } from './PublicRouter'
import { Ecommerce } from '../Ecommerce'


export const AppRouter = () => {
    const { token } = useSelector(state => state.token);
    const { role, status } = useSelector( state => state.users.auth);
    const { checking } = useSelector(state => state.auth);

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
    
    // If user get ban start logout
    useEffect(() => {
        if( status !== 0){
            dispatch( startLogout() );
        }
    }, [status, dispatch])

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

                {/* si es admin, que vaya al componente ecommerce, sino que vaya a la tienda */}
                {
                    role === 1
                    ?
                    <PrivateRoute
                        exact 
                        path="/"
                        component={Admin}
                        isAuthenticated={ !!token }
                    />
                    :
                    <PrivateRoute
                        exact 
                        path="/"
                        component={Ecommerce}
                        isAuthenticated={ !!token }
                    />
                }
                <PrivateRoute
                    exact 
                    path="/"
                    component={Admin}
                    isAuthenticated={ !!token }
                    isAdmin={role}
                />
                <Redirect to="/"/>
            </Switch>
        </Router>
    )
}
