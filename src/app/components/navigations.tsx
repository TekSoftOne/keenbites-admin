import { List } from '@material-ui/core';
import React, { FC } from 'react';
// https://material-ui.com/style/icons/
import HelpTwoToneIcon from '@material-ui/icons/HelpTwoTone';
import SettingsTwoToneIcon from '@material-ui/icons/SettingsTwoTone';
import AudiotrackTwoToneIcon from '@material-ui/icons/AudiotrackTwoTone';
import PermContactCalendarTwoToneIcon from '@material-ui/icons/PermContactCalendarTwoTone';
import { NavLink } from './nav-link';
import { useAppContext } from '../app-context';
import QuestionAnswerTwoToneIcon from '@material-ui/icons/QuestionAnswerTwoTone';

export const NavigationsComponent: FC = () => {
    const getColor = (pageName: string) => {
        console.log(appContext.currentPage);
        return appContext.currentPage === pageName ? 'primary' : 'secondary';
    };
    const appContext = useAppContext();
    return (
        <List>
            <NavLink activeOnlyWhenExact to='/' label='Settings'>
                <SettingsTwoToneIcon color={getColor('settings')} />
            </NavLink>
            <NavLink to='/expired-requests' label='Expired Requests'>
                <HelpTwoToneIcon color={getColor('requests')} />
            </NavLink>
            <NavLink to='/medias' label='Medias'>
                <AudiotrackTwoToneIcon color={getColor('medias')} />
            </NavLink>
            <NavLink to='/profiles' label='Profiles'>
                <PermContactCalendarTwoToneIcon color={getColor('profiles')} />
            </NavLink>
            <NavLink to='/disputed-answers' label='Disputed Answers'>
                <QuestionAnswerTwoToneIcon
                    color={getColor('disputed answers')}
                />
            </NavLink>
        </List>
    );
};
