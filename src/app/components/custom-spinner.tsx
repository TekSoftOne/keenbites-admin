import { CircularProgress } from '@material-ui/core';
import React, { FC } from 'react';

type CustomSpinnerProps = {
    isSmall?: boolean;
};
export const CustomSpinner: FC<CustomSpinnerProps> = (props) => {
    return (
        <CircularProgress
            size={props.isSmall ? '15px' : '25px'}
            color='primary'
        />
    );
};
