import { Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { MediaItemResult } from '../shared/interface';
import { AudioPlayer } from './audio-player';

type MediaDetailProps = {
    media?: MediaItemResult;
};

export const MediaDetail: FC<MediaDetailProps> = (props) => {
    return (
        <div style={{ width: 350 }}>
            {props.media ? (
                <AudioPlayer url={props.media.link} />
            ) : (
                <Typography>Media is not founded</Typography>
            )}
        </div>
    );
};
