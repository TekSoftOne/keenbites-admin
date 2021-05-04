import React, { FC } from 'react';
import { ButtonComponent } from './components/button-component';
import { SettingsComponent } from './settings/settings-component';
import Layout from './layout';
import { AppContext } from './app-context';

export const Main: FC = () => {
    return (
        <Layout title='Site Settings' pageName='settings'>
            <SettingsComponent />
        </Layout>
    );
};
