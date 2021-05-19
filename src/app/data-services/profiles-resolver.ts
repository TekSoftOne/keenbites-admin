import { ProfileDetail } from './../shared/interface';
import { AxiosResponse } from 'axios';
import { ProfileQueryResult, ProfilesQuery } from '../shared/interface';
import { request } from './axios';

export const getProfiles = async (
    query: ProfilesQuery
): Promise<ProfileQueryResult> => {
    return await request({
        method: 'get',
        url: `${process.env.api}/answerers`,
        timeout: 30000, // 10 seconds timeout,
        params: query,
    }).then((response: AxiosResponse) => {
        return response.data;
    });
};

export const toggleMarketPlace = async (mediaId: number): Promise<boolean> => {
    return await request({
        method: 'patch',
        url: `${process.env.api}/answerers/isMarketPlace/${mediaId}`,
        timeout: 30000, // 10 seconds timeout,
    })
        .then((response: AxiosResponse) => {
            return response.data;
        })
        .then((data: ProfileDetail) => data.isMarketPlace);
};

export const toggleBlacklist = async (profileId: number): Promise<boolean> => {
    return await request({
        method: 'patch',
        url: `${process.env.api}/answerers/isBlacklisted/${profileId}`,
        timeout: 30000, // 10 seconds timeout,
    })
        .then((response: AxiosResponse) => {
            return response.data;
        })
        .then((data: ProfileDetail) => data.isBlacklisted);
};
