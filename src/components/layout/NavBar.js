import React from 'react'
import { useDispatch } from 'react-redux';

import { NavLink } from 'react-router-dom'
import { startLogout } from '../../actions/auth';

export const NavBar = () => {
    
    // DarkMode
    let dataTheme = localStorage.getItem('data-theme');

    const enableDarkMode = () => {
        document.documentElement.setAttribute('data-theme', 'dark')
        localStorage.setItem('data-theme', 'dark')
    }
    
    const disableDarkMode = () => {
        document.documentElement.setAttribute('data-theme', 'light')
        localStorage.setItem('data-theme', 'light')
    }
    
    const darkModeToggle = () => {
        dataTheme = localStorage.getItem('data-theme');
        (dataTheme !== 'dark')
        ? enableDarkMode()
        : disableDarkMode()
    }
    // Fin Dark mode
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(startLogout());
    }

    return (
        <div className="navbar">
            <nav>
                <ul>
                    <li>
                        <NavLink to="#" onClick={darkModeToggle}>
                            <i className="fas fa-fill-drip"></i>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/notifications">
                            <i className="fas fa-bell notifications"></i>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="#" onClick={ handleLogout }>
                            <i className="fas fa-power-off logout"></i>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
