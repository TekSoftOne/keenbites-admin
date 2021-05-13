import { SettingsComponentResult } from '../shared/interface';
import { request } from './axios';

export const getSiteSettings = async (): Promise<SettingsComponentResult> => {
    return await request({
        method: 'get',
        url: `http://localhost:3000/site-configs`,
    }).then((res) => res.data);
};
