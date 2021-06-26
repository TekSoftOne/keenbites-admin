import {
    EMAIL_CONTENT_BUY_EXPERT,
    EMAIL_CONTENT_BUY_USER,
} from './../template-buy';
import { EMAIL_CONTENT_EXPIRE_EXPERT } from './../template-expire';
import {
    TemplateItem,
    TemplateParamsBuyExpert,
    TemplateParamsBuyUser,
    TemplateParamsCancelExpert,
    TemplateParamsDecline,
    TemplateParamsExpireExpert,
    TemplateParamsExpireUser,
    TemplateParamsNewRequest,
    TemplateParamsResponse,
} from '../../interfaces';

import { EMAIL_CONTENT_DECLINE_USER } from '../template-decline';

import {
    EMAIL_CONTENT_NEW_REQUEST_EXPERT,
    EMAIL_CONTENT_NEW_REQUEST_USER,
} from '../template-new-request';
import { EMAIL_CONTENT_RESPONSE_USER } from '../template-response';
import { EMAIL_CONTENT_EXPIRE_USER } from '../template-expire';
import { EMAIL_CONTENT_CANCEL_EXPERT } from '../template-cancel';

export class TEMPLATE_EMAIL_CONTENT_NEW_REQUEST_USER {
    static readonly type = 'EMAIL_CONTENT_NEW_REQUEST_USER';

    readonly type = TEMPLATE_EMAIL_CONTENT_NEW_REQUEST_USER.type;

    constructor(public templateLoader: TemplateParamsNewRequest) {}
}

export class TEMPLATE_EMAIL_CONTENT_NEW_REQUEST_EXPERT {
    static readonly type = 'EMAIL_CONTENT_NEW_REQUEST_EXPERT';

    readonly type = TEMPLATE_EMAIL_CONTENT_NEW_REQUEST_EXPERT.type;

    constructor(public templateLoader: TemplateParamsNewRequest) {}
}

export class TEMPLATE_EMAIL_CONTENT_DECLINE_USER {
    static readonly type = 'EMAIL_CONTENT_DECLINE_USER';

    readonly type = TEMPLATE_EMAIL_CONTENT_DECLINE_USER.type;

    constructor(public templateLoader: TemplateParamsDecline) {}
}

export class TEMPLATE_EMAIL_CONTENT_RESPONSE_USER {
    static readonly type = 'EMAIL_CONTENT_RESPONSE_USER';

    readonly type = TEMPLATE_EMAIL_CONTENT_RESPONSE_USER.type;

    constructor(public templateLoader: TemplateParamsResponse) {}
}

export class TEMPLATE_EMAIL_CONTENT_EXPIRE_USER {
    static readonly type = 'EMAIL_CONTENT_EXPIRE_USER';

    readonly type = TEMPLATE_EMAIL_CONTENT_EXPIRE_USER.type;

    constructor(public templateLoader: TemplateParamsExpireUser) {}
}

export class TEMPLATE_EMAIL_CONTENT_EXPIRE_EXPERT {
    static readonly type = 'EMAIL_CONTENT_EXPIRE_EXPERT';

    readonly type = TEMPLATE_EMAIL_CONTENT_EXPIRE_EXPERT.type;

    constructor(public templateLoader: TemplateParamsExpireExpert) {}
}
export class TEMPLATE_EMAIL_CONTENT_CANCEL_EXPERT {
    static readonly type = 'EMAIL_CONTENT_CANCEL_EXPERT';

    readonly type = TEMPLATE_EMAIL_CONTENT_CANCEL_EXPERT.type;

    constructor(public templateLoader: TemplateParamsCancelExpert) {}
}
export class TEMPLATE_EMAIL_CONTENT_BUY_USER {
    static readonly type = 'EMAIL_CONTENT_BUY_USER';

    readonly type = TEMPLATE_EMAIL_CONTENT_BUY_USER.type;

    constructor(public templateLoader: TemplateParamsBuyUser) {}
}
export class TEMPLATE_EMAIL_CONTENT_BUY_EXPERT {
    static readonly type = 'EMAIL_CONTENT_BUY_EXPERT';

    readonly type = TEMPLATE_EMAIL_CONTENT_BUY_EXPERT.type;

    constructor(public templateLoader: TemplateParamsBuyExpert) {}
}

export type TemplateNames =
    | TEMPLATE_EMAIL_CONTENT_NEW_REQUEST_USER
    | TEMPLATE_EMAIL_CONTENT_NEW_REQUEST_EXPERT
    | TEMPLATE_EMAIL_CONTENT_DECLINE_USER
    | TEMPLATE_EMAIL_CONTENT_RESPONSE_USER
    | TEMPLATE_EMAIL_CONTENT_EXPIRE_USER
    | TEMPLATE_EMAIL_CONTENT_EXPIRE_EXPERT
    | TEMPLATE_EMAIL_CONTENT_CANCEL_EXPERT
    | TEMPLATE_EMAIL_CONTENT_BUY_USER
    | TEMPLATE_EMAIL_CONTENT_BUY_EXPERT;

export const getEmailData = (
    templateName: TemplateNames
): TemplateItem | undefined => {
    switch (templateName.type) {
        case 'EMAIL_CONTENT_NEW_REQUEST_USER':
            return {
                title: 'Thanks! we have received your question',
                html: EMAIL_CONTENT_NEW_REQUEST_USER(
                    templateName.templateLoader.userName,
                    templateName.templateLoader.expertName,
                    templateName.templateLoader.timeToAnswer
                ),
                subject: 'Thanks! we have received your question',
            };

        case 'EMAIL_CONTENT_NEW_REQUEST_EXPERT':
            return {
                title: 'Congratulations! You have a new question!',
                html: EMAIL_CONTENT_NEW_REQUEST_EXPERT(
                    templateName.templateLoader.userName,
                    templateName.templateLoader.expertName,
                    templateName.templateLoader.timeToAnswer,
                    true
                ),
                subject: 'Congratulations! You have a new question!',
            };
        case 'EMAIL_CONTENT_DECLINE_USER':
            return {
                title: 'Refund is on your way',
                html: EMAIL_CONTENT_DECLINE_USER(
                    templateName.templateLoader.userName,
                    templateName.templateLoader.expertName,
                    templateName.templateLoader.question
                ),
                subject: 'Refund is on your way',
            };

        case 'EMAIL_CONTENT_RESPONSE_USER':
            return {
                title: 'Congrats! You have a new response',
                html: EMAIL_CONTENT_RESPONSE_USER(
                    templateName.templateLoader.userName,
                    templateName.templateLoader.expertName,
                    templateName.templateLoader.question,
                    templateName.templateLoader.responseId
                ),
                subject: 'Congrats! You have a new response',
            };

        case 'EMAIL_CONTENT_EXPIRE_USER':
            return {
                title: 'Refund is on your way!',
                html: EMAIL_CONTENT_EXPIRE_USER(
                    templateName.templateLoader.userName,
                    templateName.templateLoader.expertName
                ),
                subject: 'Refund is on your way!',
            };

        case 'EMAIL_CONTENT_EXPIRE_EXPERT':
            return {
                title: 'Opportunity lost',
                html: EMAIL_CONTENT_EXPIRE_EXPERT(
                    templateName.templateLoader.expertName,
                    templateName.templateLoader.question,
                    templateName.templateLoader.timeToAnswer
                ),
                subject: 'Opportunity lost',
            };
        case 'EMAIL_CONTENT_CANCEL_EXPERT':
            return {
                title: 'Request canceled',
                html: EMAIL_CONTENT_CANCEL_EXPERT(
                    templateName.templateLoader.userName,
                    templateName.templateLoader.expertName,
                    templateName.templateLoader.isAnonymous
                ),
                subject: 'Request canceled',
            };

        case 'EMAIL_CONTENT_BUY_USER':
            return {
                title: 'Access your response',
                html: EMAIL_CONTENT_BUY_USER(
                    templateName.templateLoader.userName,
                    templateName.templateLoader.question,
                    templateName.templateLoader.responseId
                ),
                subject: 'Access your response',
            };

        case 'EMAIL_CONTENT_BUY_EXPERT':
            return {
                title: 'Congrats! someone bought your response',
                html: EMAIL_CONTENT_BUY_EXPERT(
                    templateName.templateLoader.userName,
                    templateName.templateLoader.expertName,

                    templateName.templateLoader.question
                ),
                subject: 'Congrats! someone bought your response',
            };

        default:
            break;
    }
};
