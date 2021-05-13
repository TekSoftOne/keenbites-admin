import { useAuth0 } from '@auth0/auth0-react';
import React, { FC, useEffect } from 'react';
import Layout from './layout';
import { SettingsLoader } from './settings/settings-loader';

export const Main: FC = () => {
    return (
        <Layout title='Site Settings' pageName='settings'>
            <SettingsLoader />
        </Layout>
    );
};
