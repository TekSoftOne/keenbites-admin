import React, { FC, useEffect, useRef, useState } from 'react';
import { ButtonComponent } from '../components/button-component';
import { ToastMessage, ToastMessageHandles } from '../components/toast-message';
import { useAsyncState } from '../data-services/async-state';
import { updateDisputeStatus } from '../data-services/disputes-resolver';
import { refund } from '../data-services/purchase-resolver';
import {
    getRequestAndPurchase,
    updateRequestStatus,
} from '../data-services/requests-resolver';
import {
    DisputeStatusType,
    PurchaseForDisputeResultItem,
    RefundStatuses,
    RequestStatusType,
} from '../shared/interface';

type RefundDisputeComponentProps = {
    refundedEmit: (requestId: number) => void;
    purchase: PurchaseForDisputeResultItem;
};

export const RefundDisputedComponent: FC<RefundDisputeComponentProps> = (
    props
) => {
    const [refundConfirmed, setRefundConfirmed] = useState<boolean | undefined>(
        undefined
    );

    const [buttonText, setbuttonText] = useState('Refund');
    const toastMessageRef = useRef<ToastMessageHandles>(null);

    const stripeRefundAndDatabaseRefundHistoryAsync = useAsyncState(
        async () => {
            if (refundConfirmed === true) {
                return refund(props.purchase.orderRef);
            }
        },
        [refundConfirmed],
        refundConfirmed
    );

    const updateStatusAsync = useAsyncState(async () => {
        if (
            stripeRefundAndDatabaseRefundHistoryAsync.state === 'resolved' &&
            stripeRefundAndDatabaseRefundHistoryAsync.result &&
            stripeRefundAndDatabaseRefundHistoryAsync.result.status ===
                RefundStatuses.succeeded
        ) {
            return updateDisputeStatus(
                props.purchase.answer.dispute.id,
                DisputeStatusType.refunded
            );
        }
    }, [stripeRefundAndDatabaseRefundHistoryAsync.state]);

    useEffect(() => {
        if (
            updateStatusAsync.state === 'resolved' &&
            updateStatusAsync.result &&
            updateStatusAsync.result.id
        ) {
            props.refundedEmit(props.purchase.answer.id);
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

    const view = (
        <ButtonComponent
            isSmall={true}
            name={buttonText}
            onPress={() => setRefundConfirmed(true)}
        ></ButtonComponent>
    );

    return (
        <>
            <ToastMessage ref={toastMessageRef} isErrorUI={true} />
            {view}
        </>
    );
};
