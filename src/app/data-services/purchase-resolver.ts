import { AxiosResponse } from 'axios';
import { RefundStatus } from '../shared/interface';
import { request } from './axios';

export const refund = async (transactionId: string): Promise<RefundStatus> => {
    return await request({
        method: 'post',
        url: `${process.env.api}/stripe/refund/${transactionId}`,
        timeout: 30000, // 30 seconds timeout,
    }).then((response: AxiosResponse) => {
        return response.data;
    });
};
