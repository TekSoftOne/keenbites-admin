import React, { FC, useEffect, useRef, useState } from 'react';
import { ButtonComponent } from '../components/button-component';
import { ToastMessage, ToastMessageHandles } from '../components/toast-message';
import { useAsyncState } from '../data-services/async-state';
import { refund } from '../data-services/purchase-resolver';
import {
    getRequestAndPurchase,
    updateRequestStatus,
} from '../data-services/requests-resolver';
import { RefundStatuses, RequestStatusType } from '../shared/interface';

type RefundExpiredComponentProps = {
    refundedEmit: (requestId: number) => void;
    requestId: number;
    amount: number;
};

export const RefundExpiredComponent: FC<RefundExpiredComponentProps> = (
    props
) => {
    const [refundConfirmed, setRefundConfirmed] = useState<boolean | undefined>(
        undefined
    );

    const [buttonText, setbuttonText] = useState('Refund');
    const toastMessageRef = useRef<ToastMessageHandles>(null);

    const getRequestPurchaseAsync = useAsyncState(
        async () => {
            if (refundConfirmed === true) {
                return getRequestAndPurchase(props.requestId);
            }
        },
        [refundConfirmed],
        refundConfirmed
    );

    const stripeRefundAndDatabaseRefundHistoryAsync = useAsyncState(async () => {
        if (
            getRequestPurchaseAsync.state === 'resolved' &&
            getRequestPurchaseAsync.result &&
            getRequestPurchaseAsync.result.purchase.orderRef &&
            refundConfirmed
        )
            return refund(getRequestPurchaseAsync.result.purchase.orderRef);
    }, [getRequestPurchaseAsync.state]);

    const updateStatusAsync = useAsyncState(async () => {
        if (
            stripeRefundAndDatabaseRefundHistoryAsync.state === 'resolved' &&
            stripeRefundAndDatabaseRefundHistoryAsync.result &&
            stripeRefundAndDatabaseRefundHistoryAsync.result.status ===
                RefundStatuses.succeeded
        ) {
            return updateRequestStatus(
                props.requestId,
                RequestStatusType.expired
            );
        }
    }, [stripeRefundAndDatabaseRefundHistoryAsync.state]);

    useEffect(() => {
        if (
            updateStatusAsync.state === 'resolved' &&
            updateStatusAsync.result &&
            updateStatusAsync.result.id
        ) {
            props.refundedEmit(props.requestId);
            setRefundConfirmed(undefined);
        }
    }, [updateStatusAsync.state]);

    useEffect(() => {
        if (refundConfirmed === true) {
            setbuttonText('Processing...');
        }

        if (refundConfirmed !== true) {
            setbuttonText('Refund');
        }
    }, [refundConfirmed]);

    //Error
    useEffect(() => {
        if (getRequestPurchaseAsync.state === 'rejected') {
            toastMessageRef.current &&
                toastMessageRef.current.triggerNotify(
                    'Error occurred when getting request detail!'
                );
            setRefundConfirmed(undefined);
        }
    }, [getRequestPurchaseAsync.state]);

    useEffect(() => {
        if (stripeRefundAndDatabaseRefundHistoryAsync.state === 'rejected') {
            toastMessageRef.current &&
                toastMessageRef.current.triggerNotify(
                    'Error occurred when checking refund history!'
                );
            setRefundConfirmed(undefined);
        }
    }, [stripeRefundAndDatabaseRefundHistoryAsync.state]);

    useEffect(() => {
        if (updateStatusAsync.state === 'rejected') {
            toastMessageRef.current &&
                toastMessageRef.current.triggerNotify(
                    'Error occurred when updating status of the request!'
                );
            setRefundConfirmed(undefined);
        }
    }, [updateStatusAsync.state]);

    const view =
        props.amount > 0 ? (
            <ButtonComponent
                isSmall={true}
                name={buttonText}
                onPress={() => setRefundConfirmed(true)}
            ></ButtonComponent>
        ) : (
            <ButtonComponent
                disabled={true}
                isSmall={true}
                name={buttonText}
            ></ButtonComponent>
        );

    return (
        <>
            <ToastMessage ref={toastMessageRef} isErrorUI={true} />
            {view}
        </>
    );
};
