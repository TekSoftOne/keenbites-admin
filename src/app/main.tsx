import React, { FC } from 'react';
import Layout from './layout';
import { SettingsLoader } from './settings/settings-loader';

export const Main: FC = () => {
    return (
        <Layout title='Site Settings' pageName='settings'>
            <SettingsLoader />
        </Layout>
    );
};
