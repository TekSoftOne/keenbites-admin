import { CircularProgress } from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import { CustomSpinner } from '../components/custom-spinner';
import { useAsyncState } from '../data-services/async-state';
import { getSiteSettings } from '../data-services/site-settings-resolver';
import { SettingsComponentResult } from '../shared/interface';
import { SettingsComponent } from './settings-component';
import { SiteSettingsList } from './settings-list';

export const SettingsLoader: FC = () => {
    const getSiteSettingsAsync = useAsyncState(() => {
        return getSiteSettings();
    }, []);

    const [selectedSettings, setSelectedSettings] = useState<
        undefined | SettingsComponentResult
    >();

    return (
        <>
            {getSiteSettingsAsync.state === 'loading' ? (
                <CustomSpinner />
            ) : (
                <></>
            )}
            {
                <SiteSettingsList
                    selectedSettingsEmit={(s) => setSelectedSettings(s)}
                />
            }
            {selectedSettings ? (
                <SettingsComponent
                    key={selectedSettings.id}
                    data={selectedSettings}
                />
            ) : (
                <></>
            )}
            {getSiteSettingsAsync.state === 'resolved' && !selectedSettings ? (
                <SettingsComponent
                    data={{ ...getSiteSettingsAsync.result, id: 0 }}
                />
            ) : (
                <></>
            )}
        </>
    );
};
