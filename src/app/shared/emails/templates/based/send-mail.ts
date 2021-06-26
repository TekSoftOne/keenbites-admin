import { sendMail } from '~/app/data-services/email-resolver';
import { TemplateItem } from '../../interfaces';
import { emailTemplate } from './based-template';

export const loadEmailHtml = (templateData: TemplateItem) => {
    const { title, html } = templateData;
    return emailTemplate(title, html);
};

export const sendMailWithContent = (
    templateData: TemplateItem,
    toEmail: string
) => {
    const { subject } = templateData;
    debugger;

    return sendMail({
        subject: subject,
        from: `${process.env.emailFrom}`,
        to: toEmail,
        html: loadEmailHtml(templateData),
    });
};
