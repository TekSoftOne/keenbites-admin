import React, { FC } from 'react';
import Layout from '../layout';
import { EmailPreviewComponent } from '../shared/emails/templates/based/email-preview';

export const EmailPreviewPage: FC = () => {
    return (
        <Layout title='Email Preview' pageName='email preview'>
            <EmailPreviewComponent />
        </Layout>
    );
};
