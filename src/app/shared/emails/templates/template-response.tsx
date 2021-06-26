import React from 'react';
import { TemplateLink } from './based/template-link';
import { TemplateButton } from './based/template-button';
import { normalUserHome } from '../../constants';

export const EMAIL_CONTENT_RESPONSE_USER = (
    userName: string,
    expertName: string,
    question: string,
    responseId: number
) => {
    return (
        <>
            <p>
                Hello <b>{userName}</b>,
            </p>
            <p>
                Congratulations! <b>{expertName}</b> has responded to your
                question - “
                <span style={{ color: '#5b6885' }}>
                    <i>{question}</i>
                </span>
                ”. To access it, go to{' '}
                <TemplateLink name='My responses' link={normalUserHome} />
            </p>
            {/* <button links to keenbites.com/response/<id>> Access response </button> */}
            <TemplateButton
                name='Access response'
                link={`/response/${responseId}`}
            />
            <p>Cheers,</p>
            <p>Team Keenbites</p>
        </>
    );
};
