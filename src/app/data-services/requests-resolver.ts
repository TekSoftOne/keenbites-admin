import { AxiosResponse } from 'axios';
import {
    RequestItemResult,
    RequestQuery,
    RequestQueryResult,
    RequestStatusType,
} from '../shared/interface';
import { request } from './axios';

export const getExpiredRequests = async (
    query: RequestQuery
): Promise<RequestQueryResult> => {
    return await request({
        method: 'get',
        url: `${process.env.api}/requests`,
        params: query,
    }).then((res) => res.data);
};

export const getRequestAndPurchase = async (
    requestId: number
): Promise<RequestItemResult> => {
    return await request({
        method: 'get',
        url: `${process.env.api}/requests/${requestId}`,
        timeout: 30000, // 10 seconds timeout,
    }).then((response: AxiosResponse) => {
        return response.data;
    });
};

export const updateRequestStatus = async (
    id: number,
    status: RequestStatusType
): Promise<RequestItemResult> => {
    return await request({
        method: 'PATCH',
        url: `${process.env.api}/requests/${id}/status`,
        timeout: 30000, // 10 seconds timeout,
        data: { status },
    }).then((response: AxiosResponse) => {
        return response.data;
    });
};
