import React from 'react'
import { NavLink } from 'react-router-dom'

import { useSelector } from 'react-redux';

export const Sidebar = () => {

    const {name = "Prueba", role} = useSelector(state => state.auth)
    const getRole = () => {
        if(role === 1){
            return 'Administrator'
        }

        return 'Customer'
    }
    return (
        <div className="sidebar">
            <nav>
                <div className="logo">
                    JMRONA
                </div>
                <div className="profile">
                    <i className="fas fa-user-circle avatar"></i>
                    <p className="name">{name}</p>
                    <p className="role">{getRole()}</p>
                </div>
                <ul>
                    <NavLink to="/" exact activeClassName="active">
                        <li className="sidebar-items">
                            <i className="fas fa-tachometer-alt"></i>
                            <span>Dashboard</span>
                        </li>
                    </NavLink>
                    <NavLink to="/users" exact activeClassName="active">
                        <li className="sidebar-items" >
                                <i className="fas fa-users"></i>
                                <span>Users</span>
                        </li>
                    </NavLink>
                    <NavLink to="/roles" exact activeClassName="active">
                        <li className="sidebar-items" >
                                <i className="fas fa-scroll"></i>
                                <span>Roles</span>
                        </li>
                    </NavLink>
                    <NavLink to="/products" exact activeClassName="active">
                        <li className="sidebar-items">
                                <i className="fas fa-boxes"></i>
                                <span>Products</span>
                        </li>
                    </NavLink>
                    <NavLink to="/tools" exact>
                        <li className="sidebar-items">
                                <i className="fas fa-tools"></i>
                                <span>Tools</span>
                        </li>
                    </NavLink>
                    
                </ul>
            </nav>
        </div>
    )
}
