import React from 'react';
import { useEffect } from 'react';
import { auth } from '../authentication/authentication-service';

export const Login = () => {
    useEffect(() => auth.login(), []);

    return <div />;
};
