import { Box, Divider, makeStyles, TextField } from '@material-ui/core';
import React, { FC, useEffect, useRef, useState } from 'react';
import validator from 'validator';
import { ButtonComponent } from '../components/button-component';
import { ToastMessage, ToastMessageHandles } from '../components/toast-message';
import { useAsyncState } from '../data-services/async-state';
import { updateSiteSettings } from '../data-services/site-settings-resolver';
import {
    SettingsComponentForm,
    SettingsComponentProps,
    SettingsComponentResult,
    SiteSettingStatus,
} from '../shared/interface';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '300px',
        },
    },
}));

export const SettingsComponent: FC<SettingsComponentProps> = (props) => {
    const [isFormValid, setIsFormValid] = useState(false);
    const [submit, setSubmit] = useState<boolean | undefined>(undefined);
    const [deleteConfirmed, setDeleteConfirmed] = useState<boolean | undefined>(
        undefined
    );
    const messageRef = useRef<ToastMessageHandles>(null);
    const [
        maxTimeToAnswerStatus,
        setMaxTimeToAnswerStatus,
    ] = useState<SiteSettingStatus>({
        value: props.data.max_time_to_answer_hrs.toString(),
        isValid: true,
    });

    const [
        answerRepurchaseRateStatus,
        setAnswerRepurchaseRateStatus,
    ] = useState<SiteSettingStatus>({
        value: props.data.answer_repurchase_rate.toString(),
        isValid: true,
    });
    const [
        commissionRateStatus,
        setCommissionRateStatus,
    ] = useState<SiteSettingStatus>({
        value: props.data.commission_rate.toString(),
        isValid: true,
    });

    const [
        maxAnswerFileSizeStatus,
        setMaxAnswerFileSizeStatus,
    ] = useState<SiteSettingStatus>({
        value: props.data.max_answer_size_mins.toString(),
        isValid: true,
    });

    const handleSubmit = () => {
        if (!isFormValid) {
            return;
        }

        setSubmit(true);
    };

    const handleDelete = () => {
        setDeleteConfirmed(true);
    };

    const handleDeleteAsync = useAsyncState(async () => {
        if (deleteConfirmed === true) {
        }
    }, [deleteConfirmed]);

    const handleSubmitAsync = useAsyncState(async () => {
        if (submit === true) {
            const data: SettingsComponentForm = {
                id: props.data.id,
                max_time_to_answer_hrs: parseInt(maxTimeToAnswerStatus.value),
                answer_repurchase_rate: parseFloat(
                    answerRepurchaseRateStatus.value
                ),
                commission_rate: parseFloat(commissionRateStatus.value),
                max_answer_size_mins: parseInt(maxAnswerFileSizeStatus.value),
            };
            return updateSiteSettings(data);
        }
    }, [submit]);

    useEffect(() => {
        if (
            handleSubmitAsync.state === 'resolved' ||
            handleSubmitAsync.state === 'rejected'
        ) {
            setSubmit(false);
        }

        if (
            handleSubmitAsync.state === 'resolved' &&
            handleSubmitAsync.result
        ) {
            messageRef.current &&
                messageRef.current.triggerNotify('Updated Successfully!');
            props.updatedEmit(Date.now().toString());
        }

        if (handleSubmitAsync.state === 'rejected') {
            messageRef.current &&
                messageRef.current.triggerNotify('Error occurred!');
        }
    }, [handleSubmitAsync.state]);

    useEffect(() => {
        setIsFormValid(
            maxTimeToAnswerStatus.isValid &&
                answerRepurchaseRateStatus.isValid &&
                commissionRateStatus.isValid &&
                maxAnswerFileSizeStatus.isValid
        );
    }, [
        maxTimeToAnswerStatus,
        answerRepurchaseRateStatus,
        commissionRateStatus,
        maxAnswerFileSizeStatus,
    ]);

    const classes = useStyles();
    return (
        <div>
            <ToastMessage
                ref={messageRef}
                isErrorUI={
                    handleSubmitAsync.state === 'rejected' ? true : false
                }
            />
            <form className={classes.root} noValidate autoComplete='off'>
                <div>
                    <TextField
                        required
                        label='Max time to answer (hours)'
                        defaultValue={maxTimeToAnswerStatus.value}
                        helperText={
                            maxTimeToAnswerStatus.isValid ? '' : 'Invalid Value'
                        }
                        error={!maxTimeToAnswerStatus.isValid}
                        onChange={(event) => {
                            const val = event.target.value;

                            setMaxTimeToAnswerStatus({
                                value: val,
                                isValid: validator.isNumeric(val),
                            });
                        }}
                    />
                    <TextField
                        required
                        label='Answer repurchase rate'
                        defaultValue={answerRepurchaseRateStatus.value}
                        helperText={
                            answerRepurchaseRateStatus.isValid
                                ? ''
                                : 'Invalid Value'
                        }
                        error={!answerRepurchaseRateStatus.isValid}
                        onChange={(event) => {
                            const val = event.target.value;

                            setAnswerRepurchaseRateStatus({
                                value: val,
                                isValid: validator.isNumeric(val),
                            });
                        }}
                    />
                </div>
                <div>
                    <TextField
                        required
                        label='Commission rate'
                        defaultValue={commissionRateStatus.value}
                        helperText={
                            commissionRateStatus.isValid ? '' : 'Invalid Value'
                        }
                        error={!commissionRateStatus.isValid}
                        onChange={(event) => {
                            const val = event.target.value;

                            setCommissionRateStatus({
                                value: val,
                                isValid: validator.isNumeric(val),
                            });
                        }}
                    />
                    <TextField
                        required
                        label='Max answer file size (mins)'
                        defaultValue={maxAnswerFileSizeStatus.value}
                        helperText={
                            maxAnswerFileSizeStatus.isValid
                                ? ''
                                : 'Invalid Value'
                        }
                        error={!maxAnswerFileSizeStatus.isValid}
                        onChange={(event) => {
                            const val = event.target.value;

                            setMaxAnswerFileSizeStatus({
                                value: val,
                                isValid: validator.isNumeric(val),
                            });
                        }}
                    />
                </div>
                <br />

                <div style={{ display: 'flex' }}>
                    <ButtonComponent
                        disabled={!isFormValid}
                        name={
                            handleSubmitAsync.state === 'loading'
                                ? 'Updating...'
                                : props.data.id > 0
                                ? 'Update'
                                : 'Insert'
                        }
                        onPress={handleSubmit}
                    />
                    {/* {props.data.id > 0 ? (
                        <Box mx={2}>
                            <ButtonComponent
                                isSecondary={true}
                                disabled={!isFormValid}
                                name='Delete'
                                onPress={handleDelete}
                            />
                        </Box>
                    ) : (
                        <></>
                    )} */}
                </div>
            </form>
        </div>
    );
};
