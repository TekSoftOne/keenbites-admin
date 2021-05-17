import React, { FC, useEffect, useState } from 'react';
import { ButtonComponent } from '../components/button-component';
import { toggleBlackList } from '../data-services/answers-resolver';
import { useAsyncState } from '../data-services/async-state';
import { ToogleBlacklistStatus } from '../shared/interface';

type BlacklistComponentProps = {
    isBlacklist: boolean;
    mediaId: number;
    completedEmit: (status: ToogleBlacklistStatus) => void;
};

export const BlacklistComponent: FC<BlacklistComponentProps> = (props) => {
    const [
        toggleConfirmed,
        setToggleConfirmed,
    ] = useState<ToogleBlacklistStatus>({
        id: undefined,
        isBlacklisted: undefined,
    });

    const [defaultButtonName, setDefaultButtonName] = useState(
        props.isBlacklist ? 'Unblacklist' : 'Blacklist'
    );

    const [isBlacklist, setIsBlacklist] = useState(props.isBlacklist);

    const [buttonName, setButtonName] = useState(defaultButtonName);

    const blacklistAsync = useAsyncState(async () => {
        if (
            toggleConfirmed.id !== undefined &&
            toggleConfirmed.isBlacklisted !== undefined
        ) {
            return toggleBlackList(props.mediaId);
        }
    }, [toggleConfirmed]);

    useEffect(() => {
        if (blacklistAsync.state === 'resolved' && blacklistAsync.result) {
            setIsBlacklist(!isBlacklist);
            props.completedEmit({
                id: props.mediaId,
                isBlacklisted: !isBlacklist,
            });
        }
    }, [blacklistAsync.state]);

    useEffect(() => {
        setDefaultButtonName(isBlacklist ? 'Unblacklist' : 'Blacklist');
    }, [isBlacklist]);

    useEffect(() => {
        if (blacklistAsync.state === 'loading') {
            setButtonName('Proccessing...');
        } else {
            setButtonName(defaultButtonName);
        }
    }, [defaultButtonName, blacklistAsync.state]);

    return (
        <ButtonComponent
            name={buttonName}
            isSmall={true}
            isSecondary={!isBlacklist}
            onPress={() =>
                setToggleConfirmed({
                    id: props.mediaId,
                    isBlacklisted: !isBlacklist,
                })
            }
        ></ButtonComponent>
    );
};
