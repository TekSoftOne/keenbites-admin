import React, { FC } from 'react';
import { ButtonComponent } from './components/button-component';
import { SettingsComponent } from './components/settings-component';
import Layout from './layout';

export const Main: FC = () => {
    return (
        <Layout title='Site Settings'>
            <SettingsComponent />
        </Layout>
    );
};
