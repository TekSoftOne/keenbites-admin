import { AxiosResponse } from 'axios';
import { SendMailForm } from '../shared/emails/interfaces';
import { request } from './axios';

export const sendMail = async (sendMailForm: SendMailForm): Promise<any> => {
    return await request({
        method: 'post',
        url: `${process.env.emailUrl}`,
        timeout: 30000,
        data: sendMailForm,
    }).then((response: AxiosResponse) => {
        return response.data;
    });
};
