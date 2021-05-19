import React, { FC, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import { useAsyncState } from '../data-services/async-state';
import { CustomSpinner } from '../components/custom-spinner';
import { getSiteSettings } from '../data-services/site-settings-resolver';
import { TableAdvanced } from '../table/table-advanced';
import {
    getProfiles,
    toggleBlacklist,
    toggleMarketPlace,
} from '../data-services/profiles-resolver';
import { ToogleStatus } from '../shared/interface';
import { ToggleComponent } from '../medias/blacklist-component';
import { Avatar } from '@material-ui/core';

const headCells = [
    {
        id: 'id',

        user: false,
        disablePadding: true,
        label: 'ID',
    },
    {
        id: 'profileName',
        numeric: false,
        disablePadding: true,
        label: 'Profile Name',
    },
    {
        id: 'profileImage',
        numeric: false,
        disablePadding: true,
        label: 'Profile Image',
    },
    {
        id: 'isBlacklisted',
        numeric: false,
        disablePadding: false,
        label: 'Blacklisted',
    },
    {
        id: 'isMarketPlace',
        numeric: false,
        disablePadding: false,
        label: 'Is Market Place',
    },
];

type ProfileRow = {
    id: number;
    profileName: string;
    isBlacklisted: boolean;
    isMarketPlace: boolean;
    profileUrl: string;
};

export const ProfilesComponent: FC = () => {
    const classes = useStyles();
    const [selected, setSelected] = useState<number[]>([]);
    const [dataRows, setDataRows] = useState<ProfileRow[]>([]);
    const [
        blacklistToogledItem,
        setBlacklistToogledItem,
    ] = useState<ToogleStatus>({
        id: undefined,
        isTrue: undefined,
    });

    const [isMarketPlaceItem, setIsMarketPlaceItem] = useState<ToogleStatus>({
        id: undefined,
        isTrue: undefined,
    });

    const getSiteSettingsAsync = useAsyncState(() => getSiteSettings(), []);

    const getProfilesAsync = useAsyncState(async () => {
        if (getSiteSettingsAsync.state === 'resolved') {
            return getProfiles({
                includeUnmarketPlace: true,
                includeBlacklisted: true,
            });
        }
    }, [getSiteSettingsAsync.state]);

    useEffect(() => {
        if (getProfilesAsync.state === 'resolved' && getProfilesAsync.result) {
            const tableData = getProfilesAsync.result.items.map((profile) => {
                const id = profile.id as any;
                return createData(
                    id,
                    profile.name,
                    profile.profilePictureLink,

                    profile.isBlacklisted,
                    profile.isMarketPlace
                );
            });
            setDataRows(tableData);
        }
    }, [getProfilesAsync.state]);

    useEffect(() => {
        const changedData = dataRows.map((row) =>
            createData(
                row.id,
                row.profileName,
                row.profileUrl,
                row.isBlacklisted,
                row.isMarketPlace
            )
        );

        setDataRows(changedData);
    }, [blacklistToogledItem]);

    const handleRowItem = (rows: ProfileRow[]) => {
        return rows.map((row: ProfileRow, index: number) => {
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
                        width='10'
                    >
                        {row.id}
                    </TableCell>
                    <TableCell align='left' padding='none' width='150'>
                        {row.profileName}
                    </TableCell>
                    <TableCell align='left' padding='none' width='150'>
                        <Avatar alt={row.profileName} src={row.profileUrl} />
                    </TableCell>
                    <TableCell align='left' width='100'>
                        <ToggleComponent
                            id={row.id}
                            handleDataUpdate={() => toggleBlacklist(row.id)}
                            isTrue={row.isBlacklisted}
                        />
                    </TableCell>
                    <TableCell align='left' width='100'>
                        <ToggleComponent
                            id={row.id}
                            handleDataUpdate={() => toggleMarketPlace(row.id)}
                            isTrue={row.isMarketPlace}
                        />
                    </TableCell>
                </TableRow>
            );
        });
    };

    const handleClick = (event: any, id: number) => {};

    const createData = (
        id: number,
        profileName: string,
        profileUrl: string,
        isBlacklisted: boolean,
        isMarketPlace: boolean
    ): ProfileRow => {
        return { id, profileName, isBlacklisted, isMarketPlace, profileUrl };
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
            {getProfilesAsync.state === 'resolved' ? view : <></>}
            {getProfilesAsync.state === 'loading' ? <CustomSpinner /> : <></>}
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
