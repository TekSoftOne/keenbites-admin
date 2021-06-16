import React, { FC } from 'react';
import Layout from '../layout';
import { TransferComponent } from '../transfers/transfers-component';
export const TransfersPage: FC = () => {
    return (
        <Layout title='Transfers' pageName='transfer payments'>
            <TransferComponent />
        </Layout>
    );
};
