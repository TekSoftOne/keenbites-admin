import { Grid } from '@material-ui/core';
import React, { FC, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player/file';
import {
    AudioPlayerProps,
    MediaPlayerState,
    MediaProgressState,
} from '../shared/interface';
import { AudioControls } from './audio-control';

export const AudioPlayer: FC<AudioPlayerProps> = (props) => {
    const [mediaPlayerState, setMediaPlayerState] = useState<MediaPlayerState>({
        playing: false,
        seeking: false,
        played: 0,
        loaded: 0,
        loadedSeconds: 0,
        playedSeconds: 0,
        volume: 0.5,
        muted: false,
    });

    const [ready, setReady] = useState(false);

    const playerRef = useRef(null) as any;

    const handlePlayPause = () => {
        setMediaPlayerState({
            ...mediaPlayerState,
            playing: !mediaPlayerState.playing,
        });
    };

    const handleSeekChange = (e: any, newValue: number) => {
        setMediaPlayerState({
            ...mediaPlayerState,
            played: newValue / 100,
        });
    };

    const handleSeekMouseUpChange = (e: any, newValue: number) => {
        setMediaPlayerState({ ...mediaPlayerState, seeking: false });
        playerRef.current.seekTo(newValue / 100);
    };

    const handleSeekMouseDownChange = (e: any) => {
        setMediaPlayerState({ ...mediaPlayerState, seeking: true });
    };

    const handleVolumeChange = (e: any, newValue: any) => {
        setMediaPlayerState({
            ...mediaPlayerState,
            volume: newValue / 100,
            muted: newValue === 0 ? true : false,
        });
    };

    const handleVolumeDown = (e: any, newValue: any) => {
        setMediaPlayerState({
            ...mediaPlayerState,
            volume: newValue / 100,
            muted: newValue === 0 ? true : false,
        });
    };

    const handleProgress = (changeState: MediaProgressState) => {
        setMediaPlayerState({ ...mediaPlayerState, ...changeState });
    };

    const format = (seconds: number) => {
        if (isNaN(seconds)) {
            return '00:00';
        }

        const date = new Date(seconds * 1000);
        const hh = date.getUTCHours();
        const mm = date.getUTCMinutes();
        const ss = date.getUTCSeconds().toString().padStart(2, '0');

        if (hh) {
            return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
        }

        return `${mm}:${ss}`;
    };

    const currentTime =
        playerRef && playerRef.current
            ? (playerRef.current.getCurrentTime() as any)
            : '00:00';

    const duration =
        playerRef && playerRef.current
            ? (playerRef.current.getDuration() as any)
            : '00:00';

    const rawCurrentTime =
        playerRef && playerRef.current
            ? (playerRef.current.getCurrentTime() as any)
            : 0;

    const rawDuration =
        playerRef && playerRef.current
            ? (playerRef.current.getDuration() as any)
            : 0;

    const elapsedTime = format(currentTime);
    const totalDuration = format(duration);

    useEffect(() => {
        if (rawCurrentTime === rawDuration) {
            setMediaPlayerState({ ...mediaPlayerState, playing: false });
        }
    }, [rawCurrentTime, rawDuration]);
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'start' }}>
                <ReactPlayer
                    muted={false}
                    url={props.url}
                    playing={mediaPlayerState.playing}
                    height='auto'
                    onProgress={handleProgress}
                    ref={playerRef}
                    width='auto'
                    progressInterval={50}
                    volume={mediaPlayerState.volume}
                    onReady={() => setReady(true)}
                    config={{
                        attributes: {
                            preload: 'auto',
                        },
                    }}
                />
                <AudioControls
                    playing={mediaPlayerState.playing}
                    onPlayPause={handlePlayPause}
                    played={mediaPlayerState.played}
                    onSeek={handleSeekChange}
                    onSeekMouseDown={handleSeekMouseDownChange}
                    onSeekMouseUp={handleSeekMouseUpChange}
                    elapsedTime={elapsedTime}
                    totalDuration={totalDuration}
                    loaded={mediaPlayerState.loaded}
                    ready={ready}
                    mediaPlayerState={mediaPlayerState}
                    handleVolumeChange={handleVolumeChange}
                />
            </div>
        </>
    );
};
