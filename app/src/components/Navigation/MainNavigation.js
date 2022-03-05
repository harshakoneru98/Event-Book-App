import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import './MainNavigation.css';

function MainNavigation() {
    const navigate = useNavigate();
    let contextType = useContext(AuthContext);
    return (
        <AuthContext.Consumer>
            {(contextType) => {
                return (
                    <header className="main-navigation">
                        <div className="main-navigation__logo">
                            <h1>EasyEvent</h1>
                        </div>
                        <nav className="main-navigation__items">
                            <ul>
                                {!contextType?.token && (
                                    <li>
                                        <NavLink to="/auth">
                                            Authenticate
                                        </NavLink>
                                    </li>
                                )}
                                <li>
                                    <NavLink to="/events">Events</NavLink>
                                </li>
                                {contextType?.token && (
                                    <li>
                                        <NavLink to="/bookings">
                                            Bookings
                                        </NavLink>
                                    </li>
                                )}
                                {contextType?.token && (
                                    <li>
                                        <a
                                            className="logout-link"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                contextType.logout();
                                                navigate('/');
                                            }}
                                        >
                                            Logout
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </nav>
                    </header>
                );
            }}
        </AuthContext.Consumer>
    );
}

export default MainNavigation;
