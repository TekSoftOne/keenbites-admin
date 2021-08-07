import React, { FC, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { useAsyncState } from '../data-services/async-state';
import { CustomSpinner } from '../components/custom-spinner';
import { TableAdvanced } from '../table/table-advanced';
import { getReadyTransfers } from '../data-services/stripe-connect-resolver';
import numeral from 'numeral';
import { numberFormat } from '../shared/constants';
import TransferButton from './transfer-button';
import { Box, Typography } from '@material-ui/core';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const headCells = [
    {
        id: 'id',

        user: false,
        disablePadding: true,
        label: 'ID',
    },
    { id: 'user', numeric: false, disablePadding: true, label: 'User' },
    {
        id: 'connectId',
        numeric: false,
        disablePadding: true,
        label: 'Connect Id',
    },

    {
        id: 'toBePaid',
        numeric: false,
        disablePadding: true,
        label: 'To be paid',
    },
    {
        id: 'amountTransfer',
        numeric: false,
        disablePadding: true,
        label: 'Amount transfer',
    },

    {
        id: 'transferButton',
        numeric: false,
        disablePadding: false,
        label: '',
    },
];

type TransferRow = {
    id: number;
    userName: string;
    connectId: string;
    amount: number;
    paid: number;
};

type TransferAmountItem = {
    id: number;
    amount: number;
};

export const TransferComponent: FC = () => {
    const classes = useStyles();
    const [dataRows, setDataRows] = useState<TransferRow[]>([]);
    const [selectedDate, handleDateChange] = useState(new Date());
    const getCurrentMonth = () => {
        return new Date();
    };
    const [transactionMonth, setTransactionMonth] = useState<Date | null>(
        getCurrentMonth()
    );

    const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
    const [toDate, setToDate] = useState<Date | undefined>(undefined);

    useEffect(() => {
        if (transactionMonth) {
            const year = transactionMonth.getFullYear();
            const month = transactionMonth.getMonth();

            setFromDate(new Date(Date.UTC(year, month, 1)));
            let toDay = new Date(Date.UTC(year, month + 1, 0));

            let toDayAdd1 = new Date(Date.UTC(year, month + 1, 0));
            toDayAdd1.setDate(toDay.getDate() + 1);

            setToDate(toDayAdd1);

            console.log(new Date(Date.UTC(year, month, 1)));
            console.log(new Date(Date.UTC(year, month + 1, 0)));
        }
    }, [transactionMonth]);

    const [selected, setSelected] = useState<number[]>([]);
    const [transferedItem, setTransferedItem] = useState<undefined | string>(
        undefined
    );

    const getReadyTransfersAsync = useAsyncState(async () => {
        if (fromDate && toDate) {
            return getReadyTransfers(fromDate, toDate);
        }
    }, [transferedItem, fromDate, toDate]);

    useEffect(() => {
        if (
            getReadyTransfersAsync.state === 'resolved' &&
            getReadyTransfersAsync.result
        ) {
            const tableData = getReadyTransfersAsync.result.map((transfer) =>
                createData(
                    transfer.userId,
                    transfer.userName,
                    transfer.walletId,
                    transfer.transfered,
                    transfer.amount
                )
            );
            setDataRows(tableData);
        }
    }, [getReadyTransfersAsync]);

    const createData = (
        id: number,
        userName: string,
        connectId: string,
        paid: number,
        amount: number
    ): TransferRow => {
        return { id, userName, connectId, paid, amount };
    };

    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    const handleClick = (event: any, id: number) => {};

    const handleRowItem = (rows: TransferRow[]) => {
        return rows.map((row: TransferRow, index: number) => {
            const isItemSelected = isSelected(row.id);
            const labelId = `enhanced-table-checkbox-${index}`;

            return (
                <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role='checkbox'
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                >
                    <TableCell width='30'></TableCell>
                    <TableCell
                        component='th'
                        id={labelId}
                        scope='row'
                        padding='none'
                    >
                        {row.id}
                    </TableCell>
                    <TableCell align='left' padding='none' width='150'>
                        {row.userName}
                    </TableCell>
                    <TableCell align='left' padding='none' width='250'>
                        {row.connectId}
                    </TableCell>
                    <TableCell align='left' padding='none' width='150'>
                        {numeral(row.amount).format(numberFormat)}
                    </TableCell>
                    <TransferButton
                        key={row.id}
                        connectId={row.connectId}
                        amount={row.amount}
                        transferedEmit={(id) => {
                            setTransferedItem(id);
                        }}
                        userId={row.id}
                    />
                </TableRow>
            );
        });
    };

    const view = (
        <div className={classes.root}>
            <TableAdvanced
                headCells={headCells}
                handleRows={handleRowItem}
                dataRows={dataRows}
            />
        </div>
    );

    return (
        <>
            <Box my={2}>
                <Typography>Month</Typography>
            </Box>
            <Box my={2}>
                {/* https://reactdatepicker.com/#example-month-picker */}
                <DatePicker
                    className={classes.DatePickerText}
                    selected={transactionMonth as any}
                    onChange={(date) => setTransactionMonth(date as any)}
                    dateFormat='MM/yyyy'
                    showMonthYearPicker
                    placeholderText='Choose a month...'
                />
            </Box>
            {getReadyTransfersAsync.state === 'resolved' ? view : <></>}
            {getReadyTransfersAsync.state === 'loading' ? (
                <CustomSpinner />
            ) : (
                <></>
            )}
        </>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    DatePickerText: {
        padding: '10px',
        border: '1px solid #e6e6e6',
    },
}));
