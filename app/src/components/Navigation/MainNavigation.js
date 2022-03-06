import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import './MainNavigation.css';

function MainNavigation() {
    let contextType = useContext(AuthContext);
    return (
        <AuthContext.Consumer>
            {(contextType) => {
                return (
                    <header className="main-navigation">
                        <div className="main-navigation__logo">
                            <h1>EmpEvents</h1>
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
                                    <React.Fragment>
                                        <li>
                                            <NavLink to="/bookings">
                                                Bookings
                                            </NavLink>
                                        </li>
                                        <li>
                                            <button
                                                onClick={contextType.logout}
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    </React.Fragment>
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
