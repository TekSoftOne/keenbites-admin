import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { useAsyncState } from './data-services/async-state';

export const Login = () => {
    const { loginWithRedirect } = useAuth0();

    const loginAsync = useAsyncState(() => loginWithRedirect());

    return (
        <>
            {loginAsync.state === 'loading' ? (
                <div>Logging in...</div>
            ) : (
                <div></div>
            )}
        </>
    );
};
