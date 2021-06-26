import React from 'react';

export const EMAIL_CONTENT_EXPIRE_USER = (
    userName: string,
    expertName: string
) => {
    return (
        <>
            <p>
                Hello <b>{userName}</b>,
            </p>
            <p>
                Unfortunately, <b>{expertName}</b> failed to answer your
                question in time. But, don’t worry, we will refund you right
                away.
            </p>

            <p>Cheers,</p>
            <p>Team Keenbites</p>
        </>
    );
};

export const EMAIL_CONTENT_EXPIRE_EXPERT = (
    expertName: string,
    question: string,
    timeToAnswer: string
) => {
    return (
        <>
            <p>
                Hello <b>{expertName}</b>,
            </p>
            <p>
                We’re sorry to inform you that you’ve lost an opportunity to
                answer the question - “
                <span style={{ color: '#5b6885' }}>
                    <i>{question}</i>
                </span>
                ”. We’ll be refunding the user. In future, keep an eye on new
                requests and make sure you record a response within{' '}
                <b>{timeToAnswer}</b> hours.
            </p>
            <p>Cheers,</p>
            <p>Team Keenbites</p>
        </>
    );
};
