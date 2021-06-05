import React, { FC } from 'react';
import Layout from '../layout';
import { DisputesComponent } from '../medias/disputes-component';
import { MediasComponent } from '../medias/medias-components';
export const DisputedAnswersPage: FC = () => {
    return (
        <Layout title='Dispute Answers' pageName='disputed answers'>
            <DisputesComponent />
        </Layout>
    );
};
