import React, { useEffect, useState } from 'react';
import jwt from 'jwt-decode';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';

import { Login } from './login';
import { Main } from './main';

import { ExpiredRequestPage } from './pages/expired-requests';
import { MediasPage } from './pages/medias';
import { ProfilesPage } from './pages/profiles';
import { useAuth0 } from '@auth0/auth0-react';
import { saveAuth0Session } from './local-storage/auth0-session';
import { DisputedAnswersPage } from './pages/disputed-answers';
import { TransfersPage } from './pages/transfers';
import { EmailPreviewPage } from './pages/email-preview';

export const App = () => {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState<
        undefined | boolean
    >(undefined);

    const {
        isAuthenticated,
        user,
        isLoading,
        getAccessTokenSilently,
    } = useAuth0();

    useEffect(() => {
        if (!isLoading) {
            setIsUserAuthenticated(isAuthenticated);
        }
    }, [isLoading, isAuthenticated]);

    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Main}></Route>
                <Route
                    path='/expired-requests'
                    component={ExpiredRequestPage}
                />
                <Route path='/medias' component={MediasPage} />
                <Route path='/profiles' component={ProfilesPage} />
                <Route
                    path='/disputed-answers'
                    component={DisputedAnswersPage}
                />
                <Route path='/transfers' component={TransfersPage} />
                <Route path='/email-preview' component={EmailPreviewPage} />
            </Switch>
        </Router>
    );
};
