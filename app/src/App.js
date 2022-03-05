import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import AuthContext from './context/auth-context';
import MainNavigation from './components/Navigation/MainNavigation';
import AuthPage from './pages/Auth';
import BookingsPage from './pages/Bookings';
import EventsPage from './pages/Events';
import './App.css';

function App() {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);

    const client = new ApolloClient({
        cache: new InMemoryCache(),
        uri: 'http://localhost:4000/graphql'
    });

    let login = (token, userId, tokenExpiration) => {
        setToken(token);
        setUserId(userId);
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
    };

    let logout = () => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
        }
        if (localStorage.getItem('userId')) {
            setUserId(localStorage.getItem('userId'));
        }
    }, [localStorage]);

    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <React.Fragment>
                    <AuthContext.Provider
                        value={{
                            token: token,
                            userId: userId,
                            login: login,
                            logout: logout
                        }}
                    >
                        <MainNavigation />
                        <main className="main-content">
                            <Routes>
                                {token && (
                                    <Route
                                        exact
                                        path="/"
                                        element={<Navigate to="/events" />}
                                    />
                                )}
                                {token && (
                                    <Route
                                        exact
                                        path="/auth"
                                        element={<Navigate to="/events" />}
                                    />
                                )}
                                {!token && (
                                    <Route
                                        exact
                                        path="/auth"
                                        element={<AuthPage />}
                                    />
                                )}
                                <Route
                                    exact
                                    path="/events"
                                    element={<EventsPage />}
                                />
                                {token && (
                                    <Route
                                        exact
                                        path="/bookings"
                                        element={<BookingsPage />}
                                    />
                                )}
                                {!token && (
                                    <Route
                                        path="/*"
                                        element={<Navigate to="/auth" />}
                                    />
                                )}
                            </Routes>
                        </main>
                    </AuthContext.Provider>
                </React.Fragment>
            </BrowserRouter>
        </ApolloProvider>
    );
}

export default App;
