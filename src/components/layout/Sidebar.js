import React from 'react'
import { NavLink } from 'react-router-dom'

export const Sidebar = () => {
    // let {pathname} = useLocation();
    // pathname = pathname.split("_")[0];
    // console.log(pathname)


    return (
        <div className="sidebar">
            <nav>
                <div className="logo">
                    JMRONA
                </div>
                <div className="profile">
                    <i className="fas fa-user-circle avatar"></i>
                    <p className="name">Jose Romero</p>
                    <p className="role">Administrador</p>
                </div>
                <ul>
                    <li className="sidebar-items">
                        <NavLink to="/" exact activeClassName="active">
                            <i className="fas fa-tachometer-alt"></i>
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li className="sidebar-items" >
                        <NavLink to="/users" exact activeClassName="active">
                            <i className="fas fa-users"></i>
                            <span>Users</span>
                        </NavLink>
                    </li>
                    <li className="sidebar-items" >
                        <NavLink to="/roles" exact activeClassName="active">
                            <i className="fas fa-scroll"></i>
                            <span>Roles</span>
                        </NavLink>
                    </li>
                    <li className="sidebar-items">
                        <NavLink to="/products" exact activeClassName="active">
                            <i className="fas fa-boxes"></i>
                            <span>Products</span>
                        </NavLink>
                    </li>
                    
                </ul>
            </nav>
        </div>
    )
}
