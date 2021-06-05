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
import { ToogleStatus } from '../shared/interface';
import { SimpleDialog } from '../dialog/simple-dialog';
import { ButtonComponent } from '../components/button-component';
import { MediaDetail } from './media-detail';
import { Checkbox, Typography } from '@material-ui/core';

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
        id: 'isBlacklisted',
        numeric: false,
        disablePadding: false,
        label: 'Blacklisted',
    },
    {
        id: 'isUploaded',
        numeric: false,
        disablePadding: false,
        label: 'Uploaded',
    },
    {
        id: 'question',
        numeric: false,
        disablePadding: false,
        label: 'Question',
    },
    {
        id: 'answerText',
        numeric: false,
        disablePadding: false,
        label: 'Answer Text',
    },
    {
        id: 'buttonViewAnswer',
        numeric: false,
        disablePadding: false,
        label: '',
    },
];

type MediaRow = {
    id: number;
    user: string;
    question: string;
    answerer: string;
    answerText: string;
    isBlacklisted: boolean;
    isUploaded: boolean;
};

export const MediasComponent: FC = () => {
    const classes = useStyles();
    const [selected, setSelected] = useState<number[]>([]);
    const [dataRows, setDataRows] = useState<MediaRow[]>([]);

    const getSiteSettingsAsync = useAsyncState(() => getSiteSettings(), []);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const getMedias = useAsyncState(async () => {
        if (getSiteSettingsAsync.state === 'resolved') {
            return queryAnswers({
                includeBlacklisted: true,
                onlyFirstBuy: true,
            });
        }
    }, [getSiteSettingsAsync.state]);

    const [mediaId, setMediaId] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (getMedias.state === 'resolved' && getMedias.result) {
            const tableData = getMedias.result.items
                .filter((a) => a.media)
                .map((answer) => {
                    const id = answer?.media?.id as any;
                    return createData(
                        id,
                        answer.request.user.questionerExpert
                            ? answer.request.user.questionerExpert.name
                            : answer.request.user.questionerClient.name,
                        answer.request.question,
                        answer?.media?.description as any,
                        answer?.media?.isBlacklisted as any,
                        answer?.media?.uploaded as any,
                        answer.request.answerer.name
                    );
                });
            setDataRows(tableData);
        }
    }, [getMedias.state]);

    const loadMediaDetailAsync = useAsyncState(async () => {
        if (mediaId !== undefined) {
            return getAnswer(mediaId);
        }
    }, [mediaId]);

    const handleRowItem = (rows: MediaRow[]) => {
        return rows.map((row: MediaRow, index: number) => {
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
                        <ToggleComponent
                            handleDataUpdate={async () =>
                                toggleBlackList(row.id)
                            }
                            id={row.id}
                            isTrue={row.isBlacklisted}
                        ></ToggleComponent>
                    </TableCell>
                    <TableCell align='left' width='50'>
                        <Checkbox
                            color='primary'
                            disabled
                            checked={row.isUploaded}
                            inputProps={{
                                'aria-label': 'primary checkbox',
                            }}
                        />
                    </TableCell>
                    <TableCell align='left'>{row.question}</TableCell>
                    <TableCell align='left'>{row.answerText}</TableCell>
                    <TableCell align='left' width='200'>
                        <ButtonComponent
                            name='Open Media Answer'
                            onPress={() => {
                                setMediaId(row.id);
                                setIsDialogOpen(true);
                            }}
                        ></ButtonComponent>
                    </TableCell>
                </TableRow>
            );
        });
    };

    const handleClick = (event: any, id: number) => {};

    const createData = (
        id: number,
        user: string,
        question: string,
        answerText: string,
        isBlacklisted: boolean,
        isUploaded: boolean,
        answerer: string
    ): MediaRow => {
        return {
            id,
            user,
            question,
            answerText,
            answerer,
            isBlacklisted,
            isUploaded,
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
            {getMedias.state === 'resolved' ? view : <></>}
            {getMedias.state === 'loading' ? <CustomSpinner /> : <></>}
            <SimpleDialog
                header='Media'
                isOpen={isDialogOpen}
                emitIsOpen={(isOpen) => {
                    setIsDialogOpen(isOpen);
                    setMediaId(undefined);
                }}
            >
                <div>
                    {loadMediaDetailAsync.state === 'resolved' &&
                    loadMediaDetailAsync.result ? (
                        <MediaDetail
                            media={loadMediaDetailAsync.result.media}
                        />
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
