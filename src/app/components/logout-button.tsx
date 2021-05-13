import { useAuth0 } from '@auth0/auth0-react';
import { Link } from '@material-ui/core';
import React, { FC } from 'react';

export const LogoutButton: FC = () => {
    const { logout } = useAuth0();

    const handleLogout = (event: any) => {
        event.preventDefault();
        logout({ returnTo: window.location.origin });
    };
    return (
        <Link href='#' onClick={handleLogout}>
            Logout
        </Link>
    );
};
