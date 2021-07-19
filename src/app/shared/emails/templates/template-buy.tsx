import React from 'react';
import { normalUserHome } from '../../constants';
import { TemplateButton } from './based/template-button';
import { TemplateLink } from './based/template-link';

export const EMAIL_CONTENT_BUY_USER = (
    userName: string,
    question: string,
    responseId: number
) => {
    return (
        <>
            <p>
                Hello <b>{userName}</b>,
            </p>
            <p>
                Congrats! you can now access the response to the question - “
                <span style={{ color: '#5b6885' }}>
                    <i>{question}</i>
                </span>
                ” under <TemplateLink name='My queries' link={normalUserHome} />
            </p>
            {/* <button links to keenbites.com/response/<id>> Access response </button>\ */}
            <p>
                <TemplateButton
                    name='Access response'
                    link={`/response/${responseId}`}
                />
            </p>
            <p>Cheers,</p>
            <p>Team Keenbites</p>
        </>
    );
};

export const EMAIL_CONTENT_BUY_EXPERT = (
    userName: string,
    expertName: string,
    question: string
) => {
    return (
        <>
            <p>
                Hello <b>{expertName}</b>,
            </p>
            <p>
                Congratulations, <b>{userName}</b> bought access to your
                response to the question - “
                <span style={{ color: '#5b6885' }}>
                    <i>{question}</i>
                </span>
                ”.
            </p>
            <p>Cheers,</p>
            <p>Team Keenbites</p>
        </>
    );
};
