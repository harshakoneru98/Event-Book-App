import React from 'react';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import MainNavigation from './components/Navigation/MainNavigation';
import AuthPage from './pages/Auth';
import BookingsPage from './pages/Bookings';
import EventsPage from './pages/Events';
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

function App() {
    const client = new ApolloClient({
        cache: new InMemoryCache(),
        uri: 'http://localhost:4000/graphql'
    });

    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <React.Fragment>
                    <MainNavigation />
                    <main className="main-content">
                        <Routes>
                            <Route path="/" element={<Navigate to="/auth" />} />
                            <Route path="/auth" element={<AuthPage />} />
                            <Route path="/events" element={<EventsPage />} />
                            <Route
                                path="/bookings"
                                element={<BookingsPage />}
                            />
                        </Routes>
                    </main>
                </React.Fragment>
            </BrowserRouter>
        </ApolloProvider>
    );
}

export default App;
