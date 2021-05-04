import React, { FC } from 'react';
import Layout from '../layout';
import { MediasComponent } from '../medias/medias-components';
export const MediasPage: FC = () => {
    return (
        <Layout title='Medias' pageName='medias'>
            <MediasComponent />
        </Layout>
    );
};
