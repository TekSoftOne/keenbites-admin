import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import { auth } from '../authentication/authentication-service';
import { Login } from './login';
import { Main } from './main';
import Layout from './layout';
import { ExpiredRequestPage } from './pages/expired-requests';

export const App = () => (
    <div>
        <Router>
            <Switch>
                <Route path='/main'>
                    {auth.isSignedIn ? <Main /> : <Login />}
                </Route>
                <Route path='/' exact component={Main} />
                <Route
                    path='/expired-requests'
                    component={ExpiredRequestPage}
                />
            </Switch>
        </Router>
    </div>
);
