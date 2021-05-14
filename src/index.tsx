import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import { render } from 'react-dom';
import { App } from './app/app';

render(
    <Auth0Provider
        domain={process.env.domain as any}
        clientId={process.env.clientId as any}
        redirectUri={window.location.origin}
        audience={process.env.audience as any}
    >
        <App />
    </Auth0Provider>,
    document.getElementById('main')
);
