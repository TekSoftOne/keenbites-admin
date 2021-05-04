import React, { FC } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { ButtonComponent } from '../components/button-component';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'user', headerName: 'User', width: 130 },
    { field: 'status', headerName: 'Status', width: 130 },
    { field: 'isBlacklisted', headerName: 'Is Black List', width: 130 },
    { field: 'question', headerName: 'Question', width: 330 },
    {
        field: 'amount',
        headerName: 'Amount',
        type: 'number',
        width: 120,
    },
    // {
    //     field: 'fullName',
    //     headerName: 'Full name',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: true,
    //     width: 160,
    //     valueGetter: (params: any) =>
    //         `${params.getValue('firstName') || ''} ${
    //             params.getValue('lastName') || ''
    //         }`,
    // },
];

const rows = [
    {
        id: 1,
        user: 'Snow',
        status: 'Answered',
        isBlacklisted: 'false',
        question:
            'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock,',
        amount: 35,
    },
    {
        id: 2,
        user: 'Lannister',
        status: 'Requested',
        isBlacklisted: 'true',
        question:
            'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that i',
        amount: 42,
    },
    {
        id: 3,
        user: 'Lannister',
        status: 'Requested',
        isBlacklisted: 'false',
        question:
            'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that i',
        amount: 45,
    },
    {
        id: 4,
        user: 'Stark',
        status: 'Requested',
        isBlacklisted: 'false',
        question:
            'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that i',
        amount: 16,
    },
    {
        id: 5,
        user: 'Targaryen',
        status: 'Requested',
        isBlacklisted: 'false',
        question:
            'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that i',
        amount: 2,
    },
    {
        id: 6,
        user: 'Melisandre',
        status: 'Requested',
        isBlacklisted: 'false',
        question:
            'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that i',
        amount: 150,
    },
];

export const MediasComponent: FC = () => {
    return (
        <>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection
                />
            </div>
            <br />
            <div>
                <ButtonComponent name='Black list' />
            </div>
        </>
    );
};
