import React, { useState } from 'react'
import { Redirect, Switch, BrowserRouter as Router, } from 'react-router-dom'
import { LoginScreen } from '../components/pages/auth/LoginScreen'
import { RecoverScreen } from '../components/pages/auth/RecoverScreen'
import { RegisterScreen } from '../components/pages/auth/RegisterScreen'
import { Ecommerce } from '../Ecommerce'
import { PrivateRoute } from './PrivateRouter'
import { PublicRoute } from './PublicRouter'

export const AppRouter = () => {
    const [isAuth, setIsAuth] = useState(true)

    return (
        <Router>
            <Switch>
                <PublicRoute 
                    exact 
                    path="/login" 
                    component={LoginScreen}
                    isAuthenticated={ isAuth }
                />
                <PublicRoute 
                    exact 
                    path="/register" 
                    component={RegisterScreen}
                    isAuthenticated={ isAuth }
                />
                <PublicRoute 
                    exact 
                    path="/recover" 
                    component={RecoverScreen}
                    isAuthenticated={ isAuth }
                />

                <PrivateRoute
                    exact 
                    path="/"
                    component={Ecommerce}
                    isAuthenticated={ isAuth }
                />
                <Redirect to="/"/>
            </Switch>
        </Router>
    )
}
