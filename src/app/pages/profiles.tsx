import React, { FC } from 'react';
import Layout from '../layout';
import { ProfilesComponent } from '../profiles/profiles-component';
export const ProfilesPage: FC = () => {
    return (
        <Layout title='Profiles' pageName='profiles'>
            <ProfilesComponent />
        </Layout>
    );
};
