import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Nav = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm mb-3">
                <div className="collapse navbar-collapse ">
                    <div className="navbar-nav me-auto">
                        <NavLink className="nav-link navbar-nav" to="/ungdung1">Ứng dụng 1</NavLink>
                        <NavLink className="nav-link navbar-nav" to="/ungdung2">Ứng dụng 2</NavLink>
                        <NavLink className="nav-link navbar-nav" to="/ve/new">Thêm vé</NavLink>
                    </div>
                </div>
            </nav>

            <Outlet />
        </div>
    );
}

export default Nav;