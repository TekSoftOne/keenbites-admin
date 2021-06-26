import React from 'react';
import { expertHome, myRequestLink, myRespondLink } from '../../constants';
import { TemplateButton } from './based/template-button';
import { TemplateLink } from './based/template-link';

export const EMAIL_CONTENT_NEW_REQUEST_USER = (
    userName: string,
    expertName: string,
    timeToAnswer: string
) => {
    return (
        <>
            <p>
                Hello <b>{userName}</b>,
            </p>
            <p>
                We have received your question and will give <b>{expertName}</b>{' '}
                around <b>{timeToAnswer}</b> hours to answer. In case{' '}
                <b>{expertName}</b> doesn’t respond within that timeframe, we’ll
                refund the amount.
            </p>
            <p>
                You can keep track of your requests under{' '}
                <TemplateLink name='My responses' link={myRespondLink} />
            </p>
            <p>Cheers,</p>
            <p>Team Keenbites</p>
        </>
    );
};

export const EMAIL_CONTENT_NEW_REQUEST_EXPERT = (
    userName: string,
    expertName: string,
    timeToAnswer: string,
    isAnonymous: boolean
) => {
    return (
        <>
            <p>
                Hello <b>{expertName}</b>,
            </p>
            <p>
                Good news! you have a new question from{' '}
                <b>{isAnonymous ? 'Anonymous' : userName}</b>. You have{' '}
                <b>{timeToAnswer}</b> hours to answer. If you don’t respond by
                then, it will expire and we’ll refund the user. You can go to{' '}
                <TemplateLink name='New requests' link={`${myRequestLink}`} />{' '}
                on your Keenbites app to respond.
            </p>
            <p>
                <TemplateButton
                    name='Click here to answer'
                    link={`${process.env.host}${expertHome}`}
                />
            </p>
            <p>Cheers,</p>
            <p>Team Keenbites</p>
        </>
    );
};
