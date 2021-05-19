import React, { FC } from 'react';
import { MediaItemResult } from '../shared/interface';
import { AudioPlayer } from './audio-player';

type MediaDetailProps = {
    media: MediaItemResult;
};

export const MediaDetail: FC<MediaDetailProps> = (props) => {
    return (
        <div style={{ width: 350 }}>
            <AudioPlayer url={props.media.link} />
        </div>
    );
};
