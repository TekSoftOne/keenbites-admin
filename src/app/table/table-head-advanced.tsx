import {
    makeStyles,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
} from '@material-ui/core';
import React, { FC } from 'react';

export type OrderType = 'asc' | 'desc';

type EnhancedTableHeadProps = {
    onRequestSort: any;
    onSelectAllClick: any;
    order: OrderType;
    orderBy: string;
    rowCount: number;
    headerCells: HeaderCellType[];
};

export type HeaderCellType = {
    id: string;
    numeric?: boolean;
    user?: boolean;
    disablePadding?: boolean;
    label: string;
};

export const EnhancedTableHead: FC<EnhancedTableHeadProps> = (props) => {
    const classes = useStyles();
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property: any) => (event: any) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell></TableCell>
                {props.headerCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc'
                                        ? 'sorted descending'
                                        : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
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
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));
