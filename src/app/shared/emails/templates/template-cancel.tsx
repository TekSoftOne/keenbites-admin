import React from 'react';

export const EMAIL_CONTENT_CANCEL_EXPERT = (
    userName: string,
    expertName: string,
    isAnonymous: boolean
) => {
    return (
        <>
            <p>
                Hello <b>{expertName}</b>,
            </p>
            <p>
                Unfortunately, <b>{isAnonymous ? 'Anonymous' : userName}</b>{' '}
                canceled his/her request. We’ll refund the user. In future, try
                to respond to new requests as soon as possible. Our studies show
                that if you wait for more than 24 hours to respond, users are
                twice as likely to cancel their requests.{' '}
            </p>
            <p>Cheers,</p>
            <p>Team Keenbites</p>
        </>
    );
};
