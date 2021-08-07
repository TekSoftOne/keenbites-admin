import { AxiosResponse } from 'axios';
import {
    AnsweredQuery,
    AnsweredQueryResult,
    AnsweredQueryResultItem,
    MediaItemResult,
} from '../shared/interface';
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

export const toggleBlackList = async (mediaId: number): Promise<boolean> => {
    return await request({
        method: 'patch',
        url: `${process.env.api}/medias/isBlacklisted/${mediaId}`,
        timeout: 30000, // 10 seconds timeout,
    })
        .then((response: AxiosResponse) => {
            return response.data;
        })
        .then((data: MediaItemResult) => data.isBlacklisted);
};

export const getAnswer = async (
    answerId: number
): Promise<AnsweredQueryResultItem> => {
    return await request({
        method: 'get',
        url: `${process.env.api}/answers/${answerId}`,
        timeout: 30000, // 10 seconds timeout,
    }).then((response: AxiosResponse) => {
        const data: AnsweredQueryResultItem = response.data;
        return {
            ...data,
            media: {
                ...data.media,
                link: data.media
                    ? Buffer.from(data.media.link, 'base64').toString()
                    : '',
            },
        } as AnsweredQueryResultItem;
    });
};
