import React, { FC } from 'react';
import { ExpiredRequestComponent } from '../expired-requests/expired-requests-component';
import Layout from '../layout';
export const ExpiredRequestPage: FC = () => {
    return (
        <Layout title='Expired Requests'>
            <ExpiredRequestComponent />
        </Layout>
    );
};
