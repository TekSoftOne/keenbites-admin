import React, {
    FC,
    forwardRef,
    PropsWithChildren,
    useImperativeHandle,
} from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';
import { ProfilesPage } from '../pages/profiles';

type ToastMessageProps = {
    message: string;
    isErrorUI?: boolean;
};

const handleClick = (message: any) => () => {
    alert('sdfds');
};

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
                <Alert
                    onClose={handleClose}
                    severity='success'
                    color={isErrorUI ? 'error' : 'info'}
                >
                    {state.message}
                </Alert>
            </Snackbar>
        </div>
    );
});
