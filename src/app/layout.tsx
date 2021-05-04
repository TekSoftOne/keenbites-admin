import React, { FC, useState } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import PropTypes from 'prop-types';
import { Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

// import Image from 'material-ui-image';

import logo from '../assets/Logo.svg';
import { AppContext } from './app-context';
import { NavigationsComponent } from './components/navigations';
import PageContentComponent from './page-content';
import { drawerWidth } from './constants';

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
    const updateCurrentPage = (pageName: string) => {
        setCurrentPage(pageName);
    };
    return (
        <AppContext.Provider
            value={{
                currentPage: currentPage,
                updateCurrentPage: updateCurrentPage,
            }}
        >
            <MuiThemeProvider theme={themeDefault}>
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
                            <Typography>Hello, Joseph</Typography>
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
            </MuiThemeProvider>
        </AppContext.Provider>
    );
};

Layout.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Layout);
