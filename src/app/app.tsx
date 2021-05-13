import React, { useEffect, useState } from 'react';
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

export const App = () => {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState<
        undefined | boolean
    >(undefined);

    const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        if (!isLoading) {
            setIsUserAuthenticated(isAuthenticated);
        }
    }, [isLoading, isAuthenticated]);

    useEffect(() => {
        const saveToken = async () => {
            const token = await getAccessTokenSilently();
            saveAuth0Session(token);
        };

        if (isUserAuthenticated) {
            saveToken();
        }
    }, [isUserAuthenticated]);

    return (
        <div>
            <Router>
                <Switch>
                    <Route path='/'>
                        {isUserAuthenticated === false ? <Login /> : <Main />}
                    </Route>

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
};
