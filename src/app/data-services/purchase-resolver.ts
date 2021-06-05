import { AxiosResponse } from 'axios';
import {
    PurchaseForDisputeResultList,
    RefundStatus,
} from '../shared/interface';
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

export const getDisputedPurchases = async (): Promise<PurchaseForDisputeResultList> => {
    return await request({
        method: 'get',
        url: `${process.env.api}/purchases`,
        timeout: 30000, // 10 seconds timeout,
    }).then((response: AxiosResponse) => {
        return response.data;
    });
};
