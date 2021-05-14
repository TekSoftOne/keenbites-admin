import { SettingsComponentResult } from '../shared/interface';
import { request } from './axios';

export const getSiteSettings = async (): Promise<SettingsComponentResult> => {
    return await request({
        method: 'get',
        url: `${process.env.api}/site-configs`,
    }).then((res) => res.data);
};
