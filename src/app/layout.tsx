import React, { FC, useEffect, useState } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import PropTypes from 'prop-types';
import { Box, Button, Typography, useEventCallback } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import jwt from 'jwt-decode';

// import Image from 'material-ui-image';

import logo from '../assets/Logo.svg';
import { AppContext } from './app-context';
import { NavigationsComponent } from './components/navigations';
import PageContentComponent from './page-content';
import { drawerWidth } from './constants';
import { UserLogo } from './components/user-logo';
import {
    getAuth0Session,
    saveAuth0Session,
} from './local-storage/auth0-session';
import { getUserRole } from './shared/constants';
import { LogoutButton } from './components/logout-button';
import { useAuth0 } from '@auth0/auth0-react';
import { CustomSpinner } from './components/custom-spinner';
import { Login } from './login';

// https://material-ui.com/demos/drawers/#full-height-navigation

const themeDefault = createMuiTheme({
    palette: {
        primary: {
            main: '#1A4CFF',
        },
        secondary: {
            main: '#9F9F9F',
        },
    },
});

const styles = (theme: any) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
});

type LayoutProps = {
    classes?: any;
    title: string;
    pageName: string;
};

const Layout: FC<LayoutProps> = (props) => {
    const { classes } = props;
    const [currentPage, setCurrentPage] = useState('settings');
    const [userRole, setUserRole] = useState<undefined | string>(undefined);
    const {
        isLoading,
        user,
        isAuthenticated,
        getAccessTokenSilently,
    } = useAuth0();

    const updateCurrentPage = (pageName: string) => {
        setCurrentPage(pageName);
    };

    useEffect(() => {
        if (isLoading) return;

        const saveToken = async () => {
            if (isAuthenticated) {
                const token = await getAccessTokenSilently();

                saveAuth0Session(token);

                if (token) {
                    const userData = jwt(token) as any;

                    if (userData) {
                        const role = getUserRole(userData);
                        if (role) {
                            setUserRole(role);
                        }
                    }
                }
            }
        };

        if (!isLoading && isAuthenticated) {
            saveToken();
        }
    }, [isLoading, user, isAuthenticated]);

    const view = (
        <div className={classes.root}>
            <AppBar
                elevation={0}
                position='fixed'
                color='transparent'
                className={classes.appBar}
            >
                <Toolbar>
                    <Typography variant='h6' color='inherit' noWrap>
                        {props.title}
                    </Typography>
                    <div style={{ display: 'flex', flex: 1 }} />
                    <UserLogo />
                </Toolbar>
            </AppBar>

            <Drawer
                className={classes.drawer}
                variant='permanent'
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor='left'
            >
                <div className={classes.toolbar}>
                    <img src={logo} style={{ margin: 20 }} />
                </div>

                <NavigationsComponent />
            </Drawer>
            <PageContentComponent pageName={props.pageName}>
                {props.children}
            </PageContentComponent>
        </div>
    );

    const centerBoxView = (viewData: any, withColor?: boolean) => {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <div
                    style={{
                        backgroundColor: withColor ? '#f1f1f1' : 'transparent',
                        height: '200px',
                        width: '300px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                    }}
                >
                    {viewData}
                </div>
            </div>
        );
    };

    const unauthorizedView = centerBoxView(
        <>
            <div>Unauthorized Access!</div>
            <Box mt={2}>
                <LogoutButton isButton={true} />{' '}
            </Box>
        </>,
        true
    );

    const unauthorizedOrLogin = isAuthenticated ? unauthorizedView : <Login />;

    const layoutView = userRole === 'admin' ? view : unauthorizedOrLogin;

    return (
        <AppContext.Provider
            value={{
                currentPage: currentPage,
                updateCurrentPage: updateCurrentPage,
            }}
        >
            <MuiThemeProvider theme={themeDefault}>
                {isLoading ? centerBoxView(<CustomSpinner />) : layoutView}{' '}
            </MuiThemeProvider>
        </AppContext.Provider>
    );
};

Layout.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Layout);
