import React, { FC, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { useAsyncState } from '../data-services/async-state';
import { getExpiredRequests } from '../data-services/requests-resolver';
import { CustomSpinner } from '../components/custom-spinner';
import { ButtonComponent } from '../components/button-component';
import { RefundComponent } from './refund-component';
import { getSiteSettings } from '../data-services/site-settings-resolver';

function descendingComparator(a: any, b: any, orderBy: any) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order: any, orderBy: any) {
    return order === 'desc'
        ? (a: any, b: any) => descendingComparator(a, b, orderBy)
        : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

function stableSort(array: any, comparator: any) {
    const stabilizedThis = array.map((el: any, index: number) => [el, index]);
    stabilizedThis.sort((a: any, b: any) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el: any) => el[0]);
}

const headCells = [
    {
        id: 'id',

        user: false,
        disablePadding: true,
        label: 'id',
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

function EnhancedTableHead(props: any) {
    const {
        classes,
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
    } = props;
    const createSortHandler = (property: any) => (event: any) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    {/* <Checkbox
                        indeterminate={
                            numSelected > 0 && numSelected < rowCount
                        }
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    /> */}
                </TableCell>
                {headCells.map((headCell) => (
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
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                  color: theme.palette.secondary.main,
                  backgroundColor: lighten(theme.palette.secondary.light, 0.85),
              }
            : {
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.secondary.dark,
              },
    title: {
        flex: '1 1 100%',
    },
}));

type EnhancedTableToolbarProps = {
    numSelected: number;
    message: string;
    showSpinner: boolean;
};

const EnhancedTableToolbar: FC<EnhancedTableToolbarProps> = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <Typography component='div' className={classes.title}>
                {props.showSpinner ? <CustomSpinner /> : <></>}
            </Typography>

            {numSelected > 0 ? (
                <Tooltip title='Delete'>
                    <IconButton aria-label='delete'>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title='Filter list'>
                    <IconButton aria-label='filter list'>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
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

type ExpiredRequestRow = {
    id: number;
    user: string;
    question: string;
    amount: number;
    answerer: string;
};

export const ExpiredRequestComponent: FC = () => {
    const classes = useStyles();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState<number[]>([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [dataRows, setDataRows] = useState<ExpiredRequestRow[]>([]);
    const [refundedItem, setRefundedItem] = useState<undefined | number>(
        undefined
    );

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
                        request.answerer.name
                    )
            );
            setDataRows(tableData.filter((row) => row.id !== refundedItem));
        }
    }, [getExpiredRequestsAsync.state, refundedItem]);

    const handleRequestSort = (event: any, property: any) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: any) => {
        // if (event.target.checked) {
        //     const newSelecteds = dataRows.map((n) => n.id);
        //     setSelected(newSelecteds);
        //     return;
        // }
        // setSelected([]);
    };

    const handleClick = (event: any, id: number) => {
        // const selectedIndex = selected.indexOf(id);
        // let newSelected: number[] = [];
        // if (selectedIndex === -1) {
        //     newSelected = newSelected.concat(selected, id);
        // } else if (selectedIndex === 0) {
        //     newSelected = newSelected.concat(selected.slice(1));
        // } else if (selectedIndex === selected.length - 1) {
        //     newSelected = newSelected.concat(selected.slice(0, -1));
        // } else if (selectedIndex > 0) {
        //     newSelected = newSelected.concat(
        //         selected.slice(0, selectedIndex),
        //         selected.slice(selectedIndex + 1)
        //     );
        // }
        // setSelected(newSelected);
    };

    const createData = (
        id: number,
        user: string,
        question: string,
        amount: number,
        answerer: string
    ): ExpiredRequestRow => {
        return { id, user, question, amount, answerer };
    };

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    const emptyRows =
        rowsPerPage -
        Math.min(rowsPerPage, dataRows.length - page * rowsPerPage);

    const view = (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby='tableTitle'
                        size={dense ? 'small' : 'medium'}
                        aria-label='enhanced table'
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={dataRows.length}
                        />
                        <TableBody>
                            {stableSort(dataRows, getComparator(order, orderBy))
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map(
                                    (row: ExpiredRequestRow, index: number) => {
                                        const isItemSelected = isSelected(
                                            row.id
                                        );
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) =>
                                                    handleClick(event, row.id)
                                                }
                                                role='checkbox'
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.id}
                                                selected={isItemSelected}
                                            >
                                                <TableCell width='30'>
                                                    {/* <Checkbox
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    /> */}
                                                </TableCell>
                                                <TableCell
                                                    component='th'
                                                    id={labelId}
                                                    scope='row'
                                                    padding='none'
                                                >
                                                    {row.id}
                                                </TableCell>
                                                <TableCell
                                                    align='left'
                                                    padding='none'
                                                    width='150'
                                                >
                                                    {row.user}
                                                </TableCell>
                                                <TableCell
                                                    align='left'
                                                    padding='none'
                                                    width='150'
                                                >
                                                    {row.answerer}
                                                </TableCell>
                                                <TableCell
                                                    align='left'
                                                    width='50'
                                                >
                                                    {row.amount}
                                                </TableCell>
                                                <TableCell align='left'>
                                                    {row.question}
                                                </TableCell>
                                                <TableCell align='right'>
                                                    <RefundComponent
                                                        requestId={row.id}
                                                        amount={row.amount}
                                                        refundedEmit={(id) => {
                                                            setRefundedItem(id);
                                                        }}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        );
                                    }
                                )}

                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
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
                    >{`Total: ${dataRows.length}`}</Typography>
                    <TablePagination
                        rowsPerPageOptions={[10, 20, 50]}
                        component='div'
                        count={dataRows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </div>
            </Paper>
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
