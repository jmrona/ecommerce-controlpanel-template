import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { NavLink } from 'react-router-dom'
import { startLogout } from '../../actions/auth';
import { uisetTheme } from '../../actions/ui';


export const NavBar = () => {
    const [darkMode, setDarkMode] = useState(true);
    const dispatch = useDispatch()
    const {theme} = useSelector(state => state.ui)

    useEffect(() => {
        if(darkMode){
            document.documentElement.setAttribute('data-theme', 'dark')
            dispatch(uisetTheme('dark'))
        }else if(!darkMode){
            document.documentElement.setAttribute('data-theme', 'light')
            dispatch(uisetTheme('light'))
        }
    }, [darkMode])

    const handleLogout = () => {
        dispatch(startLogout());
    }

    return (
        <div className="navbar">
            <nav>
                <ul>
                    <li onClick={()=>setDarkMode(!darkMode)}>
                        <NavLink to="#">
                            {
                                (darkMode)
                                ?<i className="fas fa-sun light"></i>
                                :<i className="fas fa-moon dark"></i>
                            }
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/notifications">
                            <i className="fas fa-bell notifications"></i>
                        </NavLink>
                    </li>
                    <li>
                        <a onClick={ handleLogout }>
                            <i className="fas fa-power-off logout"></i>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
