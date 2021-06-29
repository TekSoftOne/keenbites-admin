import React, { FC, useEffect, useRef, useState } from 'react';
import { ButtonComponent } from '../components/button-component';
import { ToastMessage, ToastMessageHandles } from '../components/toast-message';
import { useAsyncState } from '../data-services/async-state';
import { refund } from '../data-services/purchase-resolver';
import {
    getRequestAndPurchase,
    updateRequestStatus,
} from '../data-services/requests-resolver';
import { getSiteSettings } from '../data-services/site-settings-resolver';
import { sendMailWithContent } from '../shared/emails/templates/based/send-mail';
import {
    getEmailData,
    TEMPLATE_EMAIL_CONTENT_EXPIRE_EXPERT,
    TEMPLATE_EMAIL_CONTENT_EXPIRE_USER,
} from '../shared/emails/templates/based/template-summary';
import {
    RefundStatuses,
    RequestQueryResultItem,
    RequestStatusType,
    SettingsComponentResult,
} from '../shared/interface';

type RefundExpiredComponentProps = {
    refundedEmit: (requestId: number) => void;
    request: RequestQueryResultItem;
};

export const RefundExpiredComponent: FC<RefundExpiredComponentProps> = (
    props
) => {
    const [refundConfirmed, setRefundConfirmed] = useState<boolean | undefined>(
        undefined
    );

    const [siteSetting, setSiteSetting] = useState<
        SettingsComponentResult | undefined
    >(undefined);

    const getSiteSettingsAsync = useAsyncState(() => getSiteSettings(), []);

    useEffect(() => {
        if (
            getSiteSettingsAsync.state === 'resolved' &&
            getSiteSettingsAsync.result
        ) {
            setSiteSetting(getSiteSettingsAsync.result);
        }
    }, [getSiteSettingsAsync.state]);

    const [buttonText, setbuttonText] = useState('Refund');
    const toastMessageRef = useRef<ToastMessageHandles>(null);

    const getRequestPurchaseAsync = useAsyncState(
        async () => {
            if (refundConfirmed === true) {
                return getRequestAndPurchase(props.request.id);
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
                props.request.id,
                RequestStatusType.expired
            );
        }
    }, [stripeRefundAndDatabaseRefundHistoryAsync.state]);

    const sendEmailAsync = useAsyncState(async () => {
        if (
            updateStatusAsync.state === 'resolved' &&
            updateStatusAsync.result &&
            updateStatusAsync.result.id &&
            siteSetting
        ) {
            const EMAIL_CONTENT_EXPIRE_USER = getEmailData(
                new TEMPLATE_EMAIL_CONTENT_EXPIRE_USER({
                    expertName: props.request.answerer.name,
                    userName: props.request.user.questionerExpert
                        ? props.request.user.questionerExpert.name
                        : props.request.user.questionerClient.name,
                })
            );
            const EMAIL_CONTENT_EXPIRE_EXPERT = getEmailData(
                new TEMPLATE_EMAIL_CONTENT_EXPIRE_EXPERT({
                    expertName: props.request.answerer.name,
                    question: props.request.question,
                    timeToAnswer: `${siteSetting.max_time_to_answer_hrs} hours`,
                })
            );

            if (EMAIL_CONTENT_EXPIRE_USER && props.request.user.email) {
                await sendMailWithContent(
                    EMAIL_CONTENT_EXPIRE_USER,
                    props.request.user.email
                );
            }

            if (
                EMAIL_CONTENT_EXPIRE_EXPERT &&
                props.request.answerer.user.email
            ) {
                await sendMailWithContent(
                    EMAIL_CONTENT_EXPIRE_EXPERT,
                    props.request.answerer.user.email
                );
            }

            return true;
        }
    }, [updateStatusAsync.state, siteSetting]);

    useEffect(() => {
        if (
            (sendEmailAsync.state === 'resolved' && sendEmailAsync.result) ||
            sendEmailAsync.state === 'rejected'
        ) {
            props.refundedEmit(props.request.id);
            setRefundConfirmed(undefined);
        }
    }, [sendEmailAsync.state]);

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
        props.request.price > 0 ? (
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
