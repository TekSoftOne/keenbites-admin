import {
    SettingsComponentForm,
    SettingsComponentResult,
} from '../shared/interface';
import { request } from './axios';

export const getSiteSettings = async (): Promise<SettingsComponentResult> => {
    return await request({
        method: 'get',
        url: `${process.env.api}/site-configs`,
    }).then((res) => res.data);
};

export const getSiteSettingsAllDate = async (): Promise<
    SettingsComponentResult[]
> => {
    return await request({
        method: 'get',
        url: `${process.env.api}/site-configs/all`,
    }).then((res) => res.data);
};

export const updateSiteSettings = async (
    data: SettingsComponentForm
): Promise<SettingsComponentResult> => {
    return await request({
        method: 'post',
        url: `${process.env.api}/site-configs`,
        data: data,
    }).then((res) => res.data);
};
