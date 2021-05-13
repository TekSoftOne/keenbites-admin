import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import { render } from 'react-dom';
import { App } from './app/app';

render(
    <Auth0Provider
        domain='dev-teksoft1.au.auth0.com'
        clientId='ITpW49q8LUbI91c23RDhV8AzPcifyTt7'
        redirectUri={window.location.origin}
        audience={'http://localhost:3000'}
    >
        <App />
    </Auth0Provider>,
    document.getElementById('main')
);
