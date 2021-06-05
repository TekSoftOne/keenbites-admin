import {
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { FC } from 'react';
import {
    EnhancedTableHead,
    HeaderCellType,
    OrderType,
} from './table-head-advanced';

export function descendingComparator(a: any, b: any, orderBy: any) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

export function getComparator(order: any, orderBy: any) {
    return order === 'desc'
        ? (a: any, b: any) => descendingComparator(a, b, orderBy)
        : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array: any, comparator: any) {
    const stabilizedThis = array.map((el: any, index: number) => [el, index]);
    stabilizedThis.sort((a: any, b: any) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el: any) => el[0]);
}

type TableAdvancedProps = {
    headCells: HeaderCellType[];
    handleRows: (rowItems: any) => any;
    dataRows: object[];
};

export const TableAdvanced: FC<TableAdvancedProps> = (props) => {
    const [order, setOrder] = useState<OrderType>('asc');
    const [orderBy, setOrderBy] = useState('calories');

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const classes = useStyles();

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleRequestSort = (event: any, property: any) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // const emptyRows =
    //     rowsPerPage -
    //     Math.min(rowsPerPage, props.dataRows.length - page * rowsPerPage);

    return (
        <Paper className={classes.paper}>
            <TableContainer>
                <Table
                    className={classes.table}
                    aria-labelledby='tableTitle'
                    size='medium'
                    aria-label='enhanced table'
                >
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={() => {}}
                        onRequestSort={handleRequestSort}
                        rowCount={props.dataRows.length}
                        headerCells={props.headCells}
                    />
                    <TableBody>
                        {props.handleRows(
                            stableSort(
                                props.dataRows,
                                getComparator(order, orderBy)
                            ).slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                        )}

                        {/* {emptyRows > 0 && (
                            <TableRow
                                style={{
                                    height: 53 * emptyRows,
                                }}
                            >
                                <TableCell colSpan={6} />
                            </TableRow>
                        )} */}
                    </TableBody>
                </Table>
            </TableContainer>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography
                    style={{ marginLeft: '20px' }}
                >{`Total: ${props.dataRows.length}`}</Typography>
                <TablePagination
                    rowsPerPageOptions={[10, 20, 50]}
                    component='div'
                    count={props.dataRows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </div>
        </Paper>
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
