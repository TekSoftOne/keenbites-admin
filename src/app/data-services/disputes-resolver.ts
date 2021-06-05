import { PurchaseForDispute } from './../shared/interface';
import { DisputeStatus } from '../shared/interface';
import { request } from './axios';
import { AxiosResponse } from 'axios';

export const updateDisputeStatus = async (
    id: number,
    status: DisputeStatus
): Promise<PurchaseForDispute> => {
    return await request({
        method: 'PATCH',
        url: `${process.env.api}/disputes/${id}/status`,
        timeout: 30000, // 10 seconds timeout,
        data: { status },
    }).then((response: AxiosResponse) => {
        return response.data;
    });
};
