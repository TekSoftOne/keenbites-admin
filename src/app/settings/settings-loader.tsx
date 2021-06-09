import { CircularProgress } from '@material-ui/core';
import { SystemUpdate } from '@material-ui/icons';
import React, { FC, useEffect, useState } from 'react';
import { CustomSpinner } from '../components/custom-spinner';
import { useAsyncState } from '../data-services/async-state';
import { getSiteSettings } from '../data-services/site-settings-resolver';
import { SettingsComponentResult } from '../shared/interface';
import { SettingsComponent } from './settings-component';
import { SiteSettingsList } from './settings-list';

export const SettingsLoader: FC = () => {
    const [
        updatedOrInsertedSuccessItem,
        setUpdatedOrInsertedSuccessItem,
    ] = useState<undefined | string>(undefined);

    const getSiteSettingsAsync = useAsyncState(() => {
        return getSiteSettings();
    }, [updatedOrInsertedSuccessItem]);

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
                    key={
                        updatedOrInsertedSuccessItem
                            ? updatedOrInsertedSuccessItem
                            : 1
                    }
                    selectedSettingsEmit={(s) => setSelectedSettings(s)}
                    newUpdates={updatedOrInsertedSuccessItem}
                />
            }
            {selectedSettings ? (
                <SettingsComponent
                    key={selectedSettings.id}
                    data={selectedSettings}
                    updatedEmit={(uniqueId) =>
                        setUpdatedOrInsertedSuccessItem(uniqueId)
                    }
                />
            ) : (
                <></>
            )}
            {getSiteSettingsAsync.state === 'resolved' && !selectedSettings ? (
                <SettingsComponent
                    data={{ ...getSiteSettingsAsync.result, id: 0 }}
                    updatedEmit={(uniqueId) =>
                        setUpdatedOrInsertedSuccessItem(uniqueId)
                    }
                />
            ) : (
                <></>
            )}
        </>
    );
};
