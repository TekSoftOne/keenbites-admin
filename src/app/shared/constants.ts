export const getUserRole = (userSession: any) => {
    if (!userSession) {
        return null;
    }
    const host = `${process.env.api}/roles`;
    const roles: string[] = userSession[host];

    let roleName = 'client';
    if (roles && roles.indexOf('admin') > -1) {
        roleName = 'admin';
    }

    return roleName;
};

export const numberFormat = '0,0.00';
export const numberFormatParse = '0.00';
export const numberFormatSummary = '0,0';

export const expertHome = '/my-account/new-requests';
export const normalUserHome = '/my-account/my-responses';
export const signupOrVefifyLink = '/auth-vefify';

export const myAccount = 'my-account';
export const myAccountLink = '/my-account';
export const myRespondLink = '/my-account/my-responses';
export const myRequestLink = '/my-account/new-requests';
export const myRespondLinkOtherStatus =
    '/my-account/my-responses?otherStatuses=true';
export const registerLink = '/register-respondent';
export const beRespondentLink = '/be-respondent';
export const profileLink = '/my-account/my-profile';
export const profileDetailLink = '/profiles';
export const profileDetailMeLink = '/me';

export const meUrl = '/me/';
export const faqsUrl = '/faqs';
export const termOfServiceUrl = '/terms-of-service';
export const howDoesItWorkUrl = '/how-does-it-work';
export const aboutUsUrl = '/about-us';
export const contactUsUrl = '/contact-us';
export const refundsAndDisputesUrl = '/refunds-and-disputes';
