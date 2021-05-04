import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { FC } from 'react';
import React from 'react';

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #1A4CFF 30%, #1A4CFF 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .2)',
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
});

type ButtonComponentProps = {
    name: string;
};

export const ButtonComponent: FC<ButtonComponentProps> = (props) => {
    const classes = useStyles();
    return <Button className={classes.root}>{props.name}</Button>;
};
