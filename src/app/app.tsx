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
import { MediasPage } from './pages/medias';
import { ProfilesPage } from './pages/profiles';

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
                <Route path='/medias' component={MediasPage} />
                <Route path='/profiles' component={ProfilesPage} />
            </Switch>
        </Router>
    </div>
);
