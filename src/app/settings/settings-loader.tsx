import { CircularProgress } from '@material-ui/core';
import React, { FC, useEffect } from 'react';
import { CustomSpinner } from '../components/custom-spinner';
import { useAsyncState } from '../data-services/async-state';
import { getSiteSettings } from '../data-services/site-settings-resolver';
import { SettingsComponent } from './settings-component';

export const SettingsLoader: FC = () => {
    const getSiteSettingsAsync = useAsyncState(() => {
        return getSiteSettings();
    }, []);

    return (
        <>
            {getSiteSettingsAsync.state === 'loading' ? (
                <CustomSpinner />
            ) : (
                <></>
            )}
            {getSiteSettingsAsync.state === 'resolved' ? (
                <SettingsComponent data={getSiteSettingsAsync.result} />
            ) : (
                <></>
            )}
        </>
    );
};
