import React, { FC, useEffect } from 'react';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';

type SimpleDialogProps = {
    isOpen: boolean;
    emitIsOpen: (isOpen: boolean) => void;
    header: string;
};
export const SimpleDialog: FC<SimpleDialogProps> = (props) => {
    const [open, setOpen] = React.useState(props.isOpen);

    const handleClose = () => {
        setOpen(false);
        props.emitIsOpen(false);
    };

    useEffect(() => setOpen(props.isOpen), [props.isOpen]);

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='form-dialog-title'
            >
                <DialogTitle id='form-dialog-title'>{props.header}</DialogTitle>
                <DialogContent>{props.children}</DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='primary'>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
