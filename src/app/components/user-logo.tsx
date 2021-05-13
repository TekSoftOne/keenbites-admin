import { useAuth0 } from '@auth0/auth0-react';
import { Avatar, CircularProgress } from '@material-ui/core';
import React, { FC, useEffect } from 'react';
import { LoginButton } from './login-button';
import { LogoutButton } from './logout-button';
import { ProfileDropDown } from './menu';

export const UserLogo: FC = () => {
    const {
        user,
        isAuthenticated,
        isLoading,
        getAccessTokenSilently,
    } = useAuth0();

    if (isLoading) {
        return (
            <div>
                <CircularProgress size='20px' color='primary' />
            </div>
        );
    }

    // useEffect(() => {
    //     const getToken = async () => {
    //         const token = await getAccessTokenSilently();
    //         console.log(token);
    //     };

    //     getToken();
    // }, []);

    return isAuthenticated && user && user.name ? (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
            }}
        >
            <div>
                <ProfileDropDown name={user.name}>
                    <Avatar alt={user.name} src={user.picture} />
                </ProfileDropDown>
            </div>
        </div>
    ) : (
        <LoginButton />
    );
};
