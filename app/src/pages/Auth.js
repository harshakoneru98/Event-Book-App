import React, { useState } from 'react';
import { useQuery, gql, useLazyQuery, useMutation } from '@apollo/client';
import './Auth.css';

const QUERY_LOGIN = gql`
    query tokenGeneration($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            userId
            token
            tokenExpiration
        }
    }
`;

const CREATE_USER_MUTATION = gql`
    mutation ($userInput: UserInput) {
        createUser(userInput: $userInput) {
            _id
            password
        }
    }
`;

function AuthPage() {
    const [isEmail, setIsEmail] = useState('');
    const [isPassword, setIsPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const [fetchLogin, { data: loginData, error: loginError }] =
        useLazyQuery(QUERY_LOGIN);

    const [createUser] = useMutation(CREATE_USER_MUTATION);

    let switchModeHandler = () => {
        setIsLogin(!isLogin);
    };

    let submitHandler = async () => {
        if (isEmail.trim().length === 0 || isPassword.trim().length === 0) {
            return;
        }
        if (isLogin) {
            fetchLogin({
                variables: {
                    email: isEmail,
                    password: isPassword
                }
            });
        } else {
            await createUser({
                variables: {
                    userInput: {
                        email: isEmail,
                        password: isPassword
                    }
                }
            })
                .then((data) => {
                    console.log(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    if (loginError) {
        console.log(loginError);
    }

    if (loginData) {
        console.log(loginData);
    }

    return (
        <form
            className="auth-form"
            onSubmit={(e) => {
                e.preventDefault();
                submitHandler();
            }}
        >
            <div className="form-control">
                <label htmlFor="email">E-Mail</label>
                <input
                    type="email"
                    id="email"
                    onChange={(e) => {
                        setIsEmail(e.target.value);
                    }}
                    value={isEmail}
                />
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => {
                        setIsPassword(e.target.value);
                    }}
                    value={isPassword}
                />
            </div>
            <div className="form-actions">
                <button type="submit">Submit</button>
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        switchModeHandler();
                    }}
                >
                    Switch to {isLogin ? 'Signup' : 'Login'}
                </button>
            </div>
        </form>
    );
}

export default AuthPage;
