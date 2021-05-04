import { Divider, makeStyles, TextField } from '@material-ui/core';
import React, { FC } from 'react';
import { ButtonComponent } from './button-component';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '300px',
        },
    },
}));

export const SettingsComponent: FC = () => {
    const classes = useStyles();
    return (
        <div>
            <form className={classes.root} noValidate autoComplete='off'>
                <div>
                    <TextField
                        required
                        id='standard-required'
                        label='Max time to answer (hours)'
                        defaultValue='48'
                    />
                    <TextField
                        required
                        id='standard-required'
                        label='Answer repurchase rate'
                        defaultValue='0.5'
                    />
                </div>
                <div>
                    <TextField
                        required
                        id='standard-required'
                        label='Commission rate'
                        defaultValue='18'
                    />
                    <TextField
                        required
                        id='standard-required'
                        label='Max answer file size (mins)'
                        defaultValue='10'
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
