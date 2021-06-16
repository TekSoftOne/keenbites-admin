import React, { FC, useState } from 'react';
import { ButtonComponent } from '../components/button-component';
import { useAsyncState } from '../data-services/async-state';
import { transferToConnectUser } from '../data-services/stripe-connect-resolver';

type TransferButtonProps = {
    connectId: string;
    amount: number;
    transferedEmit: (id: string) => void;
};
export const TransferButton: FC<TransferButtonProps> = (props) => {
    const [transferConfirmed, setTransferConfirmed] = useState<
        undefined | boolean
    >(undefined);
    const handleTransfer = () => {
        setTransferConfirmed(true);
    };

    const transferAsync = useAsyncState(async () => {
        if (transferConfirmed === true) {
            return transferToConnectUser({
                connectId: props.connectId,
                currency: 'usd',
                amount: props.amount,
            });
        }
    }, [transferConfirmed]);

    return (
        <ButtonComponent
            disabled={!props.connectId || props.amount <= 0}
            name='Transfer'
            onPress={handleTransfer}
        />
    );
};
