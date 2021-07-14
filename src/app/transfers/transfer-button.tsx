import {
    colors,
    TableCell,
    TextField,
    Theme,
    withStyles,
} from '@material-ui/core';
import React, { FC, useState } from 'react';
import { useEffect } from 'react';
import { ButtonComponent } from '../components/button-component';
import { useAsyncState } from '../data-services/async-state';
import PropTypes from 'prop-types';
import {
    createTransferHistory,
    transferToConnectUser,
} from '../data-services/stripe-connect-resolver';
import {
    numberFormat,
    numberFormatParse,
    numberFormatSummary,
} from '../shared/constants';
import numeral from 'numeral';
import { useRef } from 'react';
import { ToastMessage, ToastMessageHandles } from '../components/toast-message';
import { colorBlue } from '../constants';

type TransferButtonProps = {
    connectId: string;
    amount: number;
    userId: number;
    transferedEmit: (id: string) => void;
    classes?: any;
};

const TransferButton: FC<TransferButtonProps> = (props) => {
    const { classes } = props;
    const [transferConfirmed, setTransferConfirmed] = useState<
        undefined | boolean
    >(undefined);

    const handleTransfer = () => {
        setTransferConfirmed(true);
    };

    const calculateAmount = () => {
        return numeral(props.amount).format(numberFormatParse);
    };

    const [isValid, setIsValid] = useState(false);

    const [amount, setAmount] = useState<string | undefined>(calculateAmount());

    useEffect(() => {
        if (props.amount !== undefined) {
            setAmount(calculateAmount());
        }
    }, [props.amount]);

    useEffect(() => {
        setIsValid(amount !== undefined && parseFloat(amount) > 0);
    }, [amount, props.amount]);

    const errorMessageRef = useRef<ToastMessageHandles>(null);

    const transferAsync = useAsyncState(async () => {
        if (transferConfirmed === true) {
            return transferToConnectUser({
                connectId: props.connectId,
                currency: 'usd',
                amount: parseFloat(numeral(amount).format(numberFormatParse)),
            });
        }
    }, [transferConfirmed]);

    const createTransferHistoryAsync = useAsyncState(async () => {
        if (transferAsync.state === 'resolved' && transferAsync.result) {
            return createTransferHistory({
                connectId: props.connectId,
                amount: parseFloat(numeral(amount).format(numberFormatParse)),
                currency: 'usd',
                transferId: transferAsync.result.id,
                userId: props.userId,
            });
        }
    }, [transferAsync.state]);

    useEffect(() => {
        if (
            createTransferHistoryAsync.state === 'resolved' &&
            createTransferHistoryAsync.result &&
            createTransferHistoryAsync.result.id
        ) {
            props.transferedEmit(
                createTransferHistoryAsync.result.id.toString()
            );
        }
    }, [createTransferHistoryAsync.state]);

    //Error Handling
    useEffect(() => {
        if (transferAsync.state === 'rejected') {
            errorMessageRef.current &&
                errorMessageRef.current.triggerNotify(
                    'Error occured when transfering using Stripe Connect'
                );
        }
    }, [transferAsync.state]);

    useEffect(() => {
        if (createTransferHistoryAsync.state === 'rejected') {
            errorMessageRef.current &&
                errorMessageRef.current.triggerNotify(
                    'Error occured when saving transfer history'
                );
        }
    }, [createTransferHistoryAsync.state]);
    //End Error Handling

    return (
        <>
            <TableCell align='left' padding='none' width='250'>
                <ToastMessage isErrorUI={true} ref={errorMessageRef} />
                <TextField
                    error={!isValid}
                    helperText={
                        isValid ? '' : `The amount must be greater than 0`
                    }
                    InputProps={{
                        classes: {
                            input: classes.specialTextField,
                        },
                    }}
                    autoComplete='false'
                    type='text'
                    value={amount}
                    onBlur={() =>
                        setAmount(numeral(amount).format(numberFormatParse))
                    }
                    onChange={(event) => {
                        setAmount(event.target.value);
                    }}
                    onFocus={(event) => event.target.select()}
                ></TextField>
            </TableCell>
            <TableCell align='right'>
                <ButtonComponent
                    disabled={!isValid || !props.connectId}
                    name={
                        transferAsync.state === 'loading' ||
                        createTransferHistoryAsync.state === 'loading'
                            ? 'Updating...'
                            : 'Transfer'
                    }
                    onPress={handleTransfer}
                />
            </TableCell>
        </>
    );
};

const styles = (theme: Theme) => ({
    specialTextField: {
        color: colorBlue,
    },
});

TransferButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TransferButton);
