import { Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { PreviewHtmlItem } from './email-preview-html';
import { loadEmailHtml } from './send-mail';
import {
    getEmailData,
    TEMPLATE_EMAIL_CONTENT_BUY_EXPERT,
    TEMPLATE_EMAIL_CONTENT_BUY_USER,
    TEMPLATE_EMAIL_CONTENT_CANCEL_EXPERT,
    TEMPLATE_EMAIL_CONTENT_DECLINE_USER,
    TEMPLATE_EMAIL_CONTENT_EXPIRE_EXPERT,
    TEMPLATE_EMAIL_CONTENT_EXPIRE_USER,
    TEMPLATE_EMAIL_CONTENT_NEW_REQUEST_EXPERT,
    TEMPLATE_EMAIL_CONTENT_NEW_REQUEST_USER,
    TEMPLATE_EMAIL_CONTENT_RESPONSE_USER,
} from './template-summary';

export const EmailPreviewComponent: FC = () => {
    const EMAIL_CONTENT_NEW_REQUEST_USER = getEmailData(
        new TEMPLATE_EMAIL_CONTENT_NEW_REQUEST_USER({
            expertName: 'expertName'.toUpperCase(),
            userName: 'userName'.toUpperCase(),
            timeToAnswer: 'timeToAnswer'.toUpperCase(),
            isAnonymous: true,
        })
    );

    const EMAIL_CONTENT_NEW_REQUEST_EXPERT = getEmailData(
        new TEMPLATE_EMAIL_CONTENT_NEW_REQUEST_EXPERT({
            expertName: 'expertName'.toUpperCase(),
            userName: 'userName'.toUpperCase(),
            timeToAnswer: 'timeToAnswer'.toUpperCase(),
            isAnonymous: true,
        })
    );

    const EMAIL_CONTENT_DECLINE_USER = getEmailData(
        new TEMPLATE_EMAIL_CONTENT_DECLINE_USER({
            expertName: 'expertName'.toUpperCase(),
            userName: 'userName'.toUpperCase(),
            question: 'question'.toUpperCase(),
        })
    );

    const EMAIL_CONTENT_RESPONSE_USER = getEmailData(
        new TEMPLATE_EMAIL_CONTENT_RESPONSE_USER({
            expertName: 'expertName'.toUpperCase(),
            userName: 'userName'.toUpperCase(),
            question: 'question'.toUpperCase(),
            responseId: 1,
        })
    );

    const EMAIL_CONTENT_EXPIRE_USER = getEmailData(
        new TEMPLATE_EMAIL_CONTENT_EXPIRE_USER({
            expertName: 'expertName'.toUpperCase(),
            userName: 'userName'.toUpperCase(),
        })
    );
    const EMAIL_CONTENT_EXPIRE_EXPERT = getEmailData(
        new TEMPLATE_EMAIL_CONTENT_EXPIRE_EXPERT({
            expertName: 'expertName'.toUpperCase(),
            question: 'question'.toUpperCase(),
            timeToAnswer: 'timeToAnswer'.toUpperCase(),
        })
    );

    const EMAIL_CONTENT_CANCEL_EXPERT = getEmailData(
        new TEMPLATE_EMAIL_CONTENT_CANCEL_EXPERT({
            expertName: 'expertName'.toUpperCase(),
            userName: 'question'.toUpperCase(),
            isAnonymous: true,
        })
    );
    const EMAIL_CONTENT_BUY_USER = getEmailData(
        new TEMPLATE_EMAIL_CONTENT_BUY_USER({
            question: 'question'.toUpperCase(),
            userName: 'userName'.toUpperCase(),
            responseId: 1,
        })
    );
    const EMAIL_CONTENT_BUY_EXPERT = getEmailData(
        new TEMPLATE_EMAIL_CONTENT_BUY_EXPERT({
            question: 'question'.toUpperCase(),
            expertName: 'expertName'.toUpperCase(),
            userName: 'userName'.toUpperCase(),
        })
    );

    return (
        <div>
            <div className='text-center'>
                <Typography>EMAIL_CONTENT_NEW_REQUEST_USER</Typography>
            </div>
            {EMAIL_CONTENT_NEW_REQUEST_USER ? (
                <PreviewHtmlItem
                    rawHtml={loadEmailHtml(EMAIL_CONTENT_NEW_REQUEST_USER)}
                    templateItem={EMAIL_CONTENT_NEW_REQUEST_USER}
                />
            ) : (
                <></>
            )}

            <div className='text-center'>
                <Typography>EMAIL_CONTENT_NEW_REQUEST_EXPERT</Typography>
            </div>
            {EMAIL_CONTENT_NEW_REQUEST_EXPERT ? (
                <PreviewHtmlItem
                    rawHtml={loadEmailHtml(EMAIL_CONTENT_NEW_REQUEST_EXPERT)}
                    templateItem={EMAIL_CONTENT_NEW_REQUEST_EXPERT}
                />
            ) : (
                <></>
            )}

            <div className='text-center'>
                <Typography>EMAIL_CONTENT_DECLINE_USER</Typography>
            </div>
            {EMAIL_CONTENT_DECLINE_USER ? (
                <PreviewHtmlItem
                    rawHtml={loadEmailHtml(EMAIL_CONTENT_DECLINE_USER)}
                    templateItem={EMAIL_CONTENT_DECLINE_USER}
                />
            ) : (
                <></>
            )}
            <div className='text-center'>
                <Typography>EMAIL_CONTENT_RESPONSE_USER</Typography>
            </div>
            {EMAIL_CONTENT_RESPONSE_USER ? (
                <PreviewHtmlItem
                    rawHtml={loadEmailHtml(EMAIL_CONTENT_RESPONSE_USER)}
                    templateItem={EMAIL_CONTENT_RESPONSE_USER}
                />
            ) : (
                <></>
            )}
            <div className='text-center'>
                <Typography>EMAIL_CONTENT_EXPIRE_USER</Typography>
            </div>
            {EMAIL_CONTENT_EXPIRE_USER ? (
                <PreviewHtmlItem
                    rawHtml={loadEmailHtml(EMAIL_CONTENT_EXPIRE_USER)}
                    templateItem={EMAIL_CONTENT_EXPIRE_USER}
                />
            ) : (
                <></>
            )}
            <div className='text-center'>
                <Typography>EMAIL_CONTENT_EXPIRE_EXPERT</Typography>
            </div>
            {EMAIL_CONTENT_EXPIRE_EXPERT ? (
                <PreviewHtmlItem
                    rawHtml={loadEmailHtml(EMAIL_CONTENT_EXPIRE_EXPERT)}
                    templateItem={EMAIL_CONTENT_EXPIRE_EXPERT}
                />
            ) : (
                <></>
            )}
            <div className='text-center'>
                <Typography>EMAIL_CONTENT_CANCEL_EXPERT</Typography>
            </div>
            {EMAIL_CONTENT_CANCEL_EXPERT ? (
                <PreviewHtmlItem
                    rawHtml={loadEmailHtml(EMAIL_CONTENT_CANCEL_EXPERT)}
                    templateItem={EMAIL_CONTENT_CANCEL_EXPERT}
                />
            ) : (
                <></>
            )}
            <div className='text-center'>
                <Typography>EMAIL_CONTENT_BUY_USER</Typography>
            </div>
            {EMAIL_CONTENT_BUY_USER ? (
                <PreviewHtmlItem
                    rawHtml={loadEmailHtml(EMAIL_CONTENT_BUY_USER)}
                    templateItem={EMAIL_CONTENT_BUY_USER}
                />
            ) : (
                <></>
            )}
            <div className='text-center'>
                <Typography>EMAIL_CONTENT_BUY_EXPERT</Typography>
            </div>
            {EMAIL_CONTENT_BUY_EXPERT ? (
                <PreviewHtmlItem
                    rawHtml={loadEmailHtml(EMAIL_CONTENT_BUY_EXPERT)}
                    templateItem={EMAIL_CONTENT_BUY_EXPERT}
                />
            ) : (
                <></>
            )}
        </div>
    );
};
