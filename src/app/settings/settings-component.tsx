import { Divider, makeStyles, TextField } from '@material-ui/core';
import React, { FC, useState } from 'react';
import { ButtonComponent } from '../components/button-component';
import { SettingsComponentProps, SiteSettingStatus } from '../shared/interface';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '300px',
        },
    },
}));

export const SettingsComponent: FC<SettingsComponentProps> = (props) => {
    const [
        maxTimeToAnswerStatus,
        setMaxTimeToAnswerStatus,
    ] = useState<SiteSettingStatus>({
        value: props.data.max_time_to_answer_hrs,
        isValid: true,
    });
    const [
        answerRepurchaseRateStatus,
        setAnswerRepurchaseRateStatus,
    ] = useState<SiteSettingStatus>({
        value: props.data.answer_repurchase_rate,
        isValid: true,
    });
    const [
        commissionRateStatus,
        setCommissionRateStatus,
    ] = useState<SiteSettingStatus>({
        value: props.data.commission_rate,
        isValid: true,
    });

    const [
        maxAnswerFileSizeStatus,
        setMaxAnswerFileSizeStatus,
    ] = useState<SiteSettingStatus>({
        value: props.data.max_answer_size_mins,
        isValid: true,
    });

    const classes = useStyles();
    return (
        <div>
            <form className={classes.root} noValidate autoComplete='off'>
                <div>
                    <TextField
                        required
                        id='standard-required'
                        label='Max time to answer (hours)'
                        defaultValue={maxTimeToAnswerStatus.value}
                    />
                    <TextField
                        required
                        id='standard-required'
                        label='Answer repurchase rate'
                        defaultValue={answerRepurchaseRateStatus.value}
                    />
                </div>
                <div>
                    <TextField
                        required
                        id='standard-required'
                        label='Commission rate'
                        defaultValue={commissionRateStatus.value}
                    />
                    <TextField
                        required
                        id='standard-required'
                        label='Max answer file size (mins)'
                        defaultValue={maxAnswerFileSizeStatus.value}
                    />
                </div>
                <br />

                <div>
                    <ButtonComponent name='Apply' />
                </div>
            </form>
        </div>
    );
};
