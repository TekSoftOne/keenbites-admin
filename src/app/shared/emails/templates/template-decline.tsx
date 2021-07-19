import { TemplateLink } from './based/template-link';
import React from 'react';
import { myRespondLink } from '../../constants';

export const EMAIL_CONTENT_DECLINE_USER = (
    userName: string,
    expertName: string,
    question: string
) => {
    return (
        <>
            <p>
                Hello <b>{userName}</b>
                {', '}
            </p>
            <p>
                Unfortunately, <b>{expertName}</b> is currently unable to
                respond to your question - “
                <span style={{ color: '#5b6885' }}>
                    <i>{question}</i>
                </span>
                ”. But, don’t worry, we’ll refund you right away.
            </p>
            <p>
                You can track your requests under{' '}
                <TemplateLink name='My queries' link={myRespondLink} />
            </p>
            <p>Cheers,</p>
            <p>Team Keenbites</p>
        </>
    );
};
