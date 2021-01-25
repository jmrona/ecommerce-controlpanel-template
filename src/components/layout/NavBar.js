import React from 'react'
import { NavLink } from 'react-router-dom'


export const NavBar = () => {
    return (
        <div className="navbar">
            <nav>
                <ul>
                    <li>
                        <NavLink to="/notifications">
                            <i className="fas fa-bell notifications"></i>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/logout">
                            <i className="fas fa-power-off logout"></i>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
