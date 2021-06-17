import { AxiosResponse } from 'axios';
import {
    ReadyTransferitem,
    TransferForm,
    TransferHistory,
    TransferHistoryForm,
    TransferResult,
} from '../shared/interface';
import { request } from './axios';

export const getReadyTransfers = async (): Promise<ReadyTransferitem[]> => {
    return await request({
        method: 'get',
        url: `${process.env.api}/stripe-connect/report/ready-payments`,
        timeout: 30000, // 30 seconds timeout,
    }).then((response: AxiosResponse) => {
        return response.data;
    });
};

export const transferToConnectUser = async (
    transferForm: TransferForm
): Promise<TransferResult> => {
    return await request({
        method: 'post',
        url: `${process.env.api}/stripe-connect/transfer`,
        timeout: 30000, // 30 seconds timeout,
        data: transferForm,
    }).then((response: AxiosResponse) => {
        return response.data;
    });
};

export const createTransferHistory = async (
    transferForm: TransferHistoryForm
): Promise<TransferHistory> => {
    return await request({
        method: 'post',
        url: `${process.env.api}/transfers`,
        timeout: 30000, // 30 seconds timeout,
        data: transferForm,
    }).then((response: AxiosResponse) => {
        return response.data;
    });
};
