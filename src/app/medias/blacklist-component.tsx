import { Checkbox } from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import { ButtonComponent } from '../components/button-component';
import { toggleBlackList } from '../data-services/answers-resolver';
import { useAsyncState } from '../data-services/async-state';
import { ToogleStatus } from '../shared/interface';

type ToggleComponentProps = {
    isTrue: boolean;
    id: number;
    completedEmit?: (status: ToogleStatus) => void;
    handleDataUpdate: () => Promise<boolean>;
};

export const ToggleComponent: FC<ToggleComponentProps> = (props) => {
    const [toggleConfirmed, setToggleConfirmed] = useState<ToogleStatus>({
        id: undefined,
        isTrue: undefined,
    });

    const [defaultButtonName, setDefaultButtonName] = useState(
        props.isTrue ? 'Unblacklist' : 'Blacklist'
    );

    const [isTrue, setIsTrue] = useState(props.isTrue);

    const [buttonName, setButtonName] = useState(defaultButtonName);

    const blacklistAsync = useAsyncState(async () => {
        if (
            toggleConfirmed.id !== undefined &&
            toggleConfirmed.isTrue !== undefined
        ) {
            return props.handleDataUpdate();
        }
    }, [toggleConfirmed]);

    useEffect(() => {
        if (
            blacklistAsync.state === 'resolved' &&
            blacklistAsync.result !== undefined
        ) {
            console.log(blacklistAsync.result);
            setIsTrue(blacklistAsync.result);
            props.completedEmit &&
                props.completedEmit({
                    id: props.id,
                    isTrue: blacklistAsync.result,
                });
        }
    }, [blacklistAsync.state]);

    useEffect(() => {
        setDefaultButtonName(isTrue ? 'Unblacklist' : 'Blacklist');
    }, [isTrue]);

    useEffect(() => {
        if (blacklistAsync.state === 'loading') {
            setButtonName('Proccessing...');
        } else {
            setButtonName(defaultButtonName);
        }
    }, [defaultButtonName, blacklistAsync.state]);

    return (
        <>
            <Checkbox
                color='primary'
                checked={isTrue}
                inputProps={{
                    'aria-label': 'primary checkbox',
                }}
                onChange={() =>
                    setToggleConfirmed({
                        id: props.id,
                        isTrue: !isTrue,
                    })
                }
            />
        </>
    );
};
