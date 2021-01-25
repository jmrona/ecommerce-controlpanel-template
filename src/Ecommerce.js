import React from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import { DashboardScreen } from './components/pages/dashboard/DashboardScreen';
import { ProductScreen } from './components/pages/products/ProductScreen';
import { RoleScreen } from './components/pages/roles/RoleScreen';
import { NavBar } from './components/layout/NavBar';
import { Sidebar } from './components/layout/Sidebar';
import { UserScreen } from './components/pages/users/UserScreen';

export const Ecommerce = () => {
    return (
        <>
            <Router>
                <Sidebar/>
                <NavBar/>
                <main>
                    <Switch>
                        <Route exact path="/" component={DashboardScreen}/>
                        <Route exact path="/users" component={UserScreen}/>
                        <Route exact path="/products" component={ProductScreen}/>
                        <Route exact path="/roles" component={RoleScreen}/>
                    </Switch>
                </main>
            </Router>
        </>
    )
}
