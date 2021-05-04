import React, { FC } from 'react';
import { ButtonComponent } from './components/button-component';
import Layout from './layout';

export const Main: FC = () => {
    return (
        <Layout>
            <ButtonComponent name='Primary Button' />
        </Layout>
    );
};
