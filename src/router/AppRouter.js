import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Switch, BrowserRouter as Router, } from 'react-router-dom'

import { LoginScreen } from '../components/pages/auth/LoginScreen'
import { RecoverScreen } from '../components/pages/auth/RecoverScreen'
import { RegisterScreen } from '../components/pages/auth/RegisterScreen'
import { ResetPassword } from '../components/pages/auth/ResetPassword'
import { Ecommerce } from '../Ecommerce'
import { PrivateRoute } from './PrivateRouter'
import { PublicRoute } from './PublicRouter'

export const AppRouter = () => {
    const { token } = useSelector(state => state.token);

    useEffect(() => {
        
    }, [token])
    
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
