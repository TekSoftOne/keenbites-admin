import React, { FC } from 'react';
import { ControlPlay } from './control-play';
import { ControlPause } from './control-pause';

import {
    PrettoSliderMain,
    PrettoSliderMainDisabled,
    PrettoSliderSm,
    PrettoSliderSmDisabled,
    VolumeSlider,
    VolumeSliderDisabled,
} from './audio-slider';
import { MediaPlayerState } from '../shared/interface';
import { useScreenSize } from './screen-size';
import { Box, Button, createStyles, makeStyles } from '@material-ui/core';

type AudioControlsProps = {
    onPlayPause: any;
    playing: boolean;
    played: number;
    loaded: number;
    onSeek: any;
    onSeekMouseDown: any;
    onSeekMouseUp: any;
    elapsedTime: string;
    totalDuration: string;
    ready: boolean;
    mediaPlayerState: MediaPlayerState;
    handleVolumeChange: (event: any, newValue: any) => void;
};
export const AudioControls: FC<AudioControlsProps> = (props) => {
    const classes = useStyles();

    return (
        <div
            style={{
                display: 'flex',
                flexGrow: 1,
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
            className='d-flex flex-grow-1 justify-content-between align-items-center  mt-3 mt-lg-0'
        >
            <div
                style={{ display: 'flex', alignItems: 'center', width: '100%' }}
            >
                <Box>
                    {props.playing ? (
                        <Button
                            size='small'
                            onClick={props.onPlayPause}
                            className={classes.mediaButton}
                        >
                            <ControlPause isSmall={true} />
                        </Button>
                    ) : (
                        <Button
                            size='small'
                            disabled={!props.ready}
                            onClick={props.onPlayPause}
                            className={classes.mediaButton}
                        >
                            <ControlPlay
                                isDisable={!props.ready}
                                isSmall={true}
                            />
                        </Button>
                    )}
                </Box>

                {props.ready ? (
                    <PrettoSliderMain
                        min={0}
                        max={100}
                        defaultValue={0}
                        value={props.played * 100}
                        onChange={props.onSeek}
                        onMouseDown={props.onSeekMouseDown}
                        onChangeCommitted={props.onSeekMouseUp}
                    ></PrettoSliderMain>
                ) : (
                    <PrettoSliderMainDisabled
                        min={0}
                        max={100}
                        defaultValue={0}
                        value={props.played * 100}
                        onChange={props.onSeek}
                        onMouseDown={props.onSeekMouseDown}
                        onChangeCommitted={props.onSeekMouseUp}
                    ></PrettoSliderMainDisabled>
                )}
            </div>

            <Box
                m={1}
                style={{ whiteSpace: 'nowrap', fontSize: 11 }}
                className={classes.elapsedTime}
            >{`${props.elapsedTime} / ${props.totalDuration}`}</Box>
            <Box
                style={{
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'center',
                }}
                m={1}
            >
                <div
                    style={{
                        width: '50px',
                        justifyContent: 'center',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    {props.ready ? (
                        <VolumeSlider
                            min={0}
                            max={100}
                            defaultValue={props.mediaPlayerState.volume}
                            value={props.mediaPlayerState.volume * 100}
                            onChange={props.handleVolumeChange}
                        />
                    ) : (
                        <VolumeSliderDisabled
                            min={0}
                            max={100}
                            defaultValue={props.mediaPlayerState.volume}
                            value={props.mediaPlayerState.volume * 100}
                            onChange={props.handleVolumeChange}
                        />
                    )}
                </div>
            </Box>
        </div>
    );
};

const useStyles = makeStyles((theme) =>
    createStyles({
        mediaButton: {
            marginRight: '10px',
            padding: '3px',
            minWidth: '20px',
        },
        extendedIcon: {
            marginRight: theme.spacing(1),
        },
        elapsedTime: {
            marginLeft: '25px',
        },
    })
);
