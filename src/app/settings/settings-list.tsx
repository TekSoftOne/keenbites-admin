import React, { FC, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { useAsyncState } from '../data-services/async-state';
import { getExpiredRequests } from '../data-services/requests-resolver';
import { CustomSpinner } from '../components/custom-spinner';
import {
    getSiteSettings,
    getSiteSettingsAllDate,
} from '../data-services/site-settings-resolver';
import { TableAdvanced } from '../table/table-advanced';

import moment from 'moment';
import { SettingsComponentResult } from '../shared/interface';
import { Checkbox } from '@material-ui/core';

const headCells = [
    {
        id: 'id',

        user: false,
        disablePadding: true,
        label: 'ID',
    },
    {
        id: 'createdAt',
        numeric: false,
        disablePadding: false,
        label: 'From Date',
    },

    {
        id: 'maxTimeToAnswer',
        numeric: false,
        disablePadding: false,
        label: 'Max Time To Answer',
    },
    {
        id: 'repurchaseRate',
        numeric: false,
        disablePadding: false,
        label: 'Repurchase Rate',
    },
    {
        id: 'commissionRate',
        numeric: false,
        disablePadding: false,
        label: 'CommissionRate',
    },
    {
        id: 'maxAnswerFileSize',
        numeric: false,
        disablePadding: false,
        label: 'Max Answer File Size',
    },
];

type SiteSettingsRow = {
    id: number;
    settings: SettingsComponentResult;
    createdAt: Date;
    max_time_to_answer_hrs: number;
    answer_repurchase_rate: number;
    commission_rate: number;
    max_answer_size_mins: number;
};

type SiteSettingsListProps = {
    selectedSettingsEmit: (
        settings: SettingsComponentResult | undefined
    ) => void;
};
export const SiteSettingsList: FC<SiteSettingsListProps> = (props) => {
    const classes = useStyles();
    const [dataRows, setDataRows] = useState<SiteSettingsRow[]>([]);
    const [refundedItem, setRefundedItem] = useState<undefined | number>(
        undefined
    );

    const [selected, setSelected] = useState<number | undefined>(undefined);

    const getSiteSettingsAsync = useAsyncState(() => getSiteSettings(), []);

    const getAllSettingsAsync = useAsyncState(async () => {
        if (getSiteSettingsAsync.state === 'resolved') {
            return getSiteSettingsAllDate();
        }
    }, [getSiteSettingsAsync.state]);

    useEffect(() => {
        if (
            getAllSettingsAsync.state === 'resolved' &&
            getAllSettingsAsync.result
        ) {
            const tableData = getAllSettingsAsync.result.map((settings) =>
                createData(
                    settings.id,
                    settings,
                    settings.createdAt,
                    settings.max_time_to_answer_hrs,
                    settings.answer_repurchase_rate,
                    settings.commission_rate,
                    settings.max_answer_size_mins
                )
            );
            setDataRows(tableData.filter((row) => row.id !== refundedItem));
        }
    }, [getAllSettingsAsync.state, refundedItem]);

    const createData = (
        id: number,
        settings: SettingsComponentResult,
        createdAt: Date,
        max_time_to_answer_hrs: number,
        answer_repurchase_rate: number,
        commission_rate: number,
        max_answer_size_mins: number
    ): SiteSettingsRow => {
        return {
            id,
            settings,
            createdAt,
            max_time_to_answer_hrs,
            answer_repurchase_rate,
            commission_rate,
            max_answer_size_mins,
        };
    };

    const isSelected = (id: number) => selected === id;

    const handleClick = (event: any, settings: SettingsComponentResult) => {
        props.selectedSettingsEmit(settings);
        setSelected(settings.id !== selected ? settings.id : undefined);
    };

    useEffect(() => {
        if (selected === undefined) {
            props.selectedSettingsEmit(undefined);
        }
    }, [selected]);

    const handleRowItem = (rows: SiteSettingsRow[]) => {
        return rows.map((row: SiteSettingsRow, index: number) => {
            const isItemSelected = isSelected(row.id);
            const labelId = `enhanced-table-checkbox-${index}`;

            return (
                <TableRow
                    hover
                    onClick={(event) => handleClick(event, row)}
                    role='checkbox'
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                >
                    <TableCell width='30'>
                        <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                    </TableCell>
                    <TableCell
                        width='50'
                        component='th'
                        id={labelId}
                        scope='row'
                        padding='none'
                    >
                        {row.id}
                    </TableCell>
                    <TableCell align='left' width='50'>
                        {moment(row.createdAt).format('LLLL')}
                    </TableCell>
                    <TableCell align='left' width='50'>
                        {row.max_time_to_answer_hrs}
                    </TableCell>
                    <TableCell align='left' width='50'>
                        {row.answer_repurchase_rate}
                    </TableCell>
                    <TableCell align='left' width='50'>
                        {row.commission_rate}
                    </TableCell>
                    <TableCell align='left' width='50'>
                        {row.max_answer_size_mins}
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
            {getAllSettingsAsync.state === 'resolved' ? view : <></>}
            {getAllSettingsAsync.state === 'loading' ? (
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
