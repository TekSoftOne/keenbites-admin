import { AxiosResponse } from 'axios';
import { AnsweredQuery, AnsweredQueryResult } from '../shared/interface';
import { request } from './axios';

export const queryAnswers = async (
    query: AnsweredQuery
): Promise<AnsweredQueryResult> => {
    return await request({
        method: 'get',
        url: `${process.env.api}/answers`,
        timeout: 30000, // 10 seconds timeout,
        params: query,
    }).then((response: AxiosResponse) => {
        return response.data;
    });
};

export const toggleBlackList = async (
    mediaId: number
): Promise<AnsweredQueryResult> => {
    return await request({
        method: 'patch',
        url: `${process.env.api}/medias/isBlacklisted/${mediaId}`,
        timeout: 30000, // 10 seconds timeout,
    }).then((response: AxiosResponse) => {
        return response.data;
    });
};
