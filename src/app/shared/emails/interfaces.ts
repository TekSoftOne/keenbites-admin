export interface SendMailForm {
    from: string;
    to: string;
    subject: string;
    html: any;
}

export interface TemplateItemButton {
    name: string;
    link: string;
}

export interface TemplateItem {
    title: string;
    subject: string;
    html: JSX.Element;
}

export interface TemplateParamsNewRequest {
    userName: string;
    expertName: string;
    timeToAnswer: string;
}
export interface TemplateParamsDecline {
    userName: string;
    expertName: string;
    question: string;
}

export interface TemplateParamsResponse {
    userName: string;
    expertName: string;
    question: string;
    responseId: number;
}

export interface TemplateParamsExpireUser {
    userName: string;
    expertName: string;
}

export interface TemplateParamsExpireExpert {
    expertName: string;
    question: string;
    timeToAnswer: string;
}

export interface TemplateParamsCancelExpert {
    expertName: string;
    userName: string;
    isAnonymous: boolean;
}

export interface TemplateParamsBuyUser {
    userName: string;
    question: string;
    responseId: number;
}
export interface TemplateParamsBuyExpert {
    userName: string;
    expertName: string;
    question: string;
}
