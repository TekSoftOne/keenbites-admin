import React, {
    FC,
    forwardRef,
    PropsWithChildren,
    useImperativeHandle,
} from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import { Alert, AlertTitle } from '@material-ui/lab';
import { ProfilesPage } from '../pages/profiles';
import { makeStyles } from '@material-ui/core';

type ToastMessageProps = {
    isErrorUI?: boolean;
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(10),
        },
    },
}));

export type ToastMessageHandles = {
    triggerNotify: (message: string) => void;
};

export const ToastMessage = forwardRef<
    ToastMessageHandles,
    PropsWithChildren<ToastMessageProps>
>(({ children, isErrorUI }, ref) => {
    useImperativeHandle(ref, () => {
        return {
            triggerNotify: (message: string) => {
                setState({ open: true, message: message });
            },
        };
    });

    const [state, setState] = React.useState({
        open: false,
        message: '',
    });

    const { open } = state;

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    const classes = useStyles();

    return (
        <div>
            <Snackbar
                autoHideDuration={2000}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open}
                onClose={handleClose}
                message='I love snacks'
                key={'top' + 'right'}
            >
                <div className={classes.root}>
                    <Alert
                        variant='filled'
                        onClose={handleClose}
                        severity={isErrorUI ? 'error' : 'success'}
                        color={isErrorUI ? 'error' : 'success'}
                    >
                        <AlertTitle>
                            {isErrorUI ? 'Error' : 'Success'}
                        </AlertTitle>
                        {state.message}
                    </Alert>
                </div>
            </Snackbar>
        </div>
    );
});
