import React, { FC, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { useAsyncState } from '../data-services/async-state';
import { getExpiredRequests } from '../data-services/requests-resolver';
import { CustomSpinner } from '../components/custom-spinner';
import { RefundExpiredComponent } from './refund-expired-component';
import { getSiteSettings } from '../data-services/site-settings-resolver';
import { TableAdvanced } from '../table/table-advanced';
import { RequestQueryResultItem } from '../shared/interface';

const headCells = [
    {
        id: 'id',

        user: false,
        disablePadding: true,
        label: 'ID',
    },
    { id: 'user', numeric: false, disablePadding: true, label: 'User' },
    {
        id: 'answerer',
        numeric: false,
        disablePadding: true,
        label: 'Respondent',
    },
    { id: 'amount', numeric: false, disablePadding: false, label: 'Amount' },
    {
        id: 'question',
        numeric: false,
        disablePadding: false,
        label: 'Question',
    },
    {
        id: '',
        numeric: false,
        disablePadding: false,
        label: '',
    },
];

type ExpiredRequestRow = {
    id: number;
    user: string;
    question: string;
    amount: number;
    answerer: string;
    request: RequestQueryResultItem;
};

export const ExpiredRequestComponent: FC = () => {
    const classes = useStyles();
    const [dataRows, setDataRows] = useState<ExpiredRequestRow[]>([]);
    const [refundedItem, setRefundedItem] = useState<undefined | number>(
        undefined
    );

    const [selected, setSelected] = useState<number[]>([]);

    const getSiteSettingsAsync = useAsyncState(() => getSiteSettings(), []);

    const getExpiredRequestsAsync = useAsyncState(async () => {
        if (getSiteSettingsAsync.state === 'resolved') {
            return getExpiredRequests({
                expiredDate:
                    getSiteSettingsAsync.result.max_time_to_answer_hrs / 24,
            });
        }
    }, [getSiteSettingsAsync.state]);

    useEffect(() => {
        if (
            getExpiredRequestsAsync.state === 'resolved' &&
            getExpiredRequestsAsync.result
        ) {
            const tableData = getExpiredRequestsAsync.result.items.map(
                (request) =>
                    createData(
                        request.id,
                        request.user.questionerExpert
                            ? request.user.questionerExpert.name
                            : request.user.questionerClient.name,
                        request.question,
                        request.price,
                        request.answerer.name,
                        request
                    )
            );
            setDataRows(tableData.filter((row) => row.id !== refundedItem));
        }
    }, [getExpiredRequestsAsync.state, refundedItem]);

    const createData = (
        id: number,
        user: string,
        question: string,
        amount: number,
        answerer: string,
        request: RequestQueryResultItem
    ): ExpiredRequestRow => {
        return { id, user, question, amount, answerer, request };
    };

    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    const handleClick = (event: any, id: number) => {};

    const handleRowItem = (rows: ExpiredRequestRow[]) => {
        return rows.map((row: ExpiredRequestRow, index: number) => {
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
                        {row.user}
                    </TableCell>
                    <TableCell align='left' padding='none' width='150'>
                        {row.answerer}
                    </TableCell>
                    <TableCell align='left' width='50'>
                        {row.amount}
                    </TableCell>
                    <TableCell align='left'>{row.question}</TableCell>
                    <TableCell align='right'>
                        <RefundExpiredComponent
                            request={row.request}
                            refundedEmit={(id) => {
                                setRefundedItem(id);
                            }}
                        />
                    </TableCell>
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
            {getExpiredRequestsAsync.state === 'resolved' ? view : <></>}
            {getExpiredRequestsAsync.state === 'loading' ? (
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
}));
