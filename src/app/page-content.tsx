import { withStyles } from '@material-ui/styles';
import React, { FC, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from './app-context';

const styles = (theme: any) => ({
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: '#ffffff',
    },
});

type PageContentComponentProps = {
    classes?: any;
    pageName: string;
};

export const PageContentComponent: FC<PageContentComponentProps> = (props) => {
    const { classes } = props;
    const { updateCurrentPage } = useAppContext();

    useEffect(() => {
        updateCurrentPage(props.pageName);
    }, []);
    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <div>{props.children}</div>
        </main>
    );
};

PageContentComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PageContentComponent);
