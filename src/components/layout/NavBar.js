import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'


export const NavBar = () => {
    const [darkMode, setDarkMode] = useState(true);

    const checkTheme = () => {
        let localStorageTheme = localStorage.getItem('data-theme');
        if(!localStorageTheme){
            localStorage.setItem('data-theme', 'dark');
            document.documentElement.setAttribute('data-theme', 'dark')
            setDarkMode(true);
        }
    }

    useEffect(() => {
        checkTheme();
        
        const theme = document.documentElement.getAttribute('data-theme');
        localStorage.setItem('data-theme', theme)

    }, [document.documentElement.getAttribute('data-theme')])

    const darkTheme = () =>{
        darkMode 
        ? document.documentElement.setAttribute('data-theme', 'dark')
        : document.documentElement.setAttribute('data-theme', 'light')
    }

    return (
        <div className="navbar">
            <nav>
                <ul>
                    <li onClick={()=>setDarkMode(!darkMode)} onChange={darkTheme()}>
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
                        <NavLink to="/logout">
                            <i className="fas fa-power-off logout"></i>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
