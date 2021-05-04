import React from 'react';
import { HashRouter, Redirect, Route } from 'react-router-dom';
import { auth } from '../authentication/authentication-service';
import { Login } from './login';
import { Main } from './main';

export const App = () => (
    <div>
        <HashRouter>
            <Route path='/main'>{auth.isSignedIn ? <Main /> : <Login />}</Route>
            <Route path='/' exact={true}>
                <Redirect to={{ pathname: '/main' }} />
            </Route>
        </HashRouter>
    </div>
);
