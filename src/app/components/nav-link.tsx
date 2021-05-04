import { Icon, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React, { FC } from 'react';
import { Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

type NavLinkProps = {
    label?: string;
    to: any;
    activeOnlyWhenExact?: any;
};

export const NavLink: FC<NavLinkProps> = (props) => {
    let history = useHistory();
    return (
        <Route
            path={props.to}
            exact={props.activeOnlyWhenExact}
            children={({ match }) => (
                <ListItem
                    onClick={() => {
                        history.push(props.to);
                    }}
                    button
                    selected={Boolean(match)}
                >
                    <ListItemIcon>{props.children}</ListItemIcon>
                    <ListItemText>{props.label}</ListItemText>
                </ListItem>
            )}
        />
    );
};
