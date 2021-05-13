import { useAuth0 } from '@auth0/auth0-react';
import { Link } from '@material-ui/core';
import React, { FC } from 'react';
import { ProfilesPage } from '../pages/profiles';
import { ButtonComponent } from './button-component';

type LogoutButtonProps = {
    isButton?: boolean;
};

export const LogoutButton: FC<LogoutButtonProps> = (props) => {
    const { logout } = useAuth0();

    const handleLogout = (event: any) => {
        event.preventDefault();
        logout({ returnTo: window.location.origin });
    };
    return (
        <>
            {props.isButton ? (
                <ButtonComponent name='Logout' onPress={handleLogout} />
            ) : (
                <Link href='#' onClick={handleLogout}>
                    Logout
                </Link>
            )}
        </>
    );
};
