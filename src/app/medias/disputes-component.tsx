import React, { FC, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { useAsyncState } from '../data-services/async-state';
import { CustomSpinner } from '../components/custom-spinner';
import { getSiteSettings } from '../data-services/site-settings-resolver';
import {
    getAnswer,
    queryAnswers,
    toggleBlackList,
} from '../data-services/answers-resolver';
import { ToggleComponent } from './blacklist-component';

import { TableAdvanced } from '../table/table-advanced';
import {
    DisputeStatus,
    DisputeStatusType,
    PurchaseForDisputeResultItem,
    ToogleStatus,
} from '../shared/interface';
import { SimpleDialog } from '../dialog/simple-dialog';
import { ButtonComponent } from '../components/button-component';
import { MediaDetail } from './media-detail';
import { Checkbox, Typography } from '@material-ui/core';
import { getDisputedPurchases } from '../data-services/purchase-resolver';
import { RefundDisputedComponent } from '../expired-requests/refund-disputed-component';

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
    {
        id: 'disputeStatus',
        numeric: false,
        disablePadding: false,
        label: 'Dispute Status',
    },

    {
        id: 'question',
        numeric: false,
        disablePadding: false,
        label: 'Question',
    },
    {
        id: 'amount',
        numeric: true,
        disablePadding: false,
        label: 'Amount',
    },
    {
        id: 'answerText',
        numeric: false,
        disablePadding: false,
        label: 'Answer Text',
    },
    {
        id: 'reason',
        numeric: false,
        disablePadding: false,
        label: 'Reason',
    },
    {
        id: 'buttonViewAnswer',
        numeric: false,
        disablePadding: false,
        label: '',
    },
];

type AnswerRow = {
    id: number;
    purchase: PurchaseForDisputeResultItem;
    user: string;
    question: string;
    amount: number;
    answerer: string;
    answerText: string;
    disputeStatus: DisputeStatus;
    reason: string;
};

export const DisputesComponent: FC = () => {
    const classes = useStyles();
    const [selected, setSelected] = useState<number[]>([]);
    const [dataRows, setDataRows] = useState<AnswerRow[]>([]);
    const [refundedItem, setRefundedItem] = useState<undefined | number>(
        undefined
    );
    const [currentPurchase, setCurrentPurchase] = useState<
        undefined | PurchaseForDisputeResultItem
    >(undefined);

    const getSiteSettingsAsync = useAsyncState(() => getSiteSettings(), []);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const getPurchases = useAsyncState(async () => {
        if (getSiteSettingsAsync.state === 'resolved') {
            return getDisputedPurchases();
        }
    }, [getSiteSettingsAsync.state]);

    const [answerId, setAnswerId] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (getPurchases.state === 'resolved' && getPurchases.result) {
            const tableData = getPurchases.result.items.map((purchase) => {
                const id = purchase.answer.id;
                return createData(
                    id,
                    purchase,
                    purchase.client.name,
                    purchase.request.question,
                    purchase.amount,
                    purchase.answer.media.description as any,
                    purchase.answer.dispute.disputeStatus.name,
                    purchase.request.answerer.name,
                    purchase.answer.dispute.reason
                );
            });
            setDataRows(tableData);
        }
    }, [getPurchases.state]);

    const loadMediaDetailAsync = useAsyncState(async () => {
        if (answerId !== undefined) {
            return getAnswer(answerId);
        }
    }, [answerId]);

    const handleRowItem = (rows: AnswerRow[]) => {
        return rows.map((row: AnswerRow, index: number) => {
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
                    <TableCell align='left' width='150'>
                        {row.disputeStatus}
                    </TableCell>

                    <TableCell align='left'>{row.question}</TableCell>
                    <TableCell align='left'>{row.amount}</TableCell>
                    <TableCell align='left'>{row.answerText}</TableCell>
                    <TableCell align='left'>{row.reason}</TableCell>
                    <TableCell align='left' width='200'>
                        <ButtonComponent
                            name='Open Media Answer'
                            onPress={() => {
                                setAnswerId(row.id);
                                setIsDialogOpen(true);
                            }}
                        ></ButtonComponent>
                    </TableCell>
                    <TableCell align='left' width='150'>
                        <RefundDisputedComponent
                            purchase={row.purchase}
                            refundedEmit={(id) => {
                                setRefundedItem(id);
                            }}
                        />
                    </TableCell>
                </TableRow>
            );
        });
    };

    const handleClick = (event: any, id: number) => {};

    const createData = (
        id: number,
        purchase: PurchaseForDisputeResultItem,
        user: string,
        question: string,
        amount: number,
        answerText: string,
        disputeStatus: DisputeStatus,
        answerer: string,
        reason: string
    ): AnswerRow => {
        return {
            id,
            purchase,
            user,
            question,
            amount,
            answerText,
            answerer,
            disputeStatus,
            reason,
        };
    };

    const isSelected = (id: number) => selected.indexOf(id) !== -1;

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
            {getPurchases.state === 'resolved' ? view : <></>}
            {getPurchases.state === 'loading' ? <CustomSpinner /> : <></>}
            <SimpleDialog
                header='Media'
                isOpen={isDialogOpen}
                emitIsOpen={(isOpen) => {
                    setIsDialogOpen(isOpen);
                    setAnswerId(undefined);
                }}
            >
                <div>
                    {loadMediaDetailAsync.state === 'resolved' ? (
                        <>
                            {loadMediaDetailAsync.result &&
                            loadMediaDetailAsync.result.media ? (
                                <MediaDetail
                                    media={loadMediaDetailAsync.result.media}
                                />
                            ) : (
                                <Typography>Media is not founded</Typography>
                            )}
                        </>
                    ) : (
                        <></>
                    )}
                    {loadMediaDetailAsync.state === 'loading' ? (
                        <CustomSpinner />
                    ) : (
                        <></>
                    )}
                </div>
            </SimpleDialog>
        </>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
}));
