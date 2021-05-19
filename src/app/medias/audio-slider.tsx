import Slider from '@material-ui/core/Slider';
import withStyles from '@material-ui/core/styles/withStyles';

const primary = '#1A4CFF';
const primaryLight = '#8da6ff';
const grey = '#F3F3F3';
const greyer = '#c6c6c6';
const barLeft = primary;
const barLeftDisabled = '#cccccc';
const barLeftLoader = primaryLight;
const barColorReady = primaryLight;

const barColor = grey;
const thumbColor = '#f7f7f7';
const thumbColorInsideDisabled = '#cccccc';
const thumbColorInside = primary;

export const PrettoSliderSm = withStyles({
    root: {
        //color: 'white',
        height: 4,
    },
    thumb: {
        height: 16,
        width: 16,
        backgroundColor: thumbColorInside,
        border: `5px solid ${thumbColor}`,
        marginTop: -6,
        marginLeft: -2,
        '&:focus, &:hover, &$active': {
            boxShadow: '0px 0px 16px 12px rgba(0,0,0,0.05);',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 4,
        borderRadius: 4,
        color: barLeft,
    },
    rail: {
        height: 4,
        borderRadius: 4,
        color: barColorReady,
        opacity: 1,
    },
})(Slider);

export const PrettoSliderSmDisabled = withStyles({
    root: {
        //color: 'white',
        height: 4,
    },
    thumb: {
        height: 16,
        width: 16,
        backgroundColor: thumbColorInsideDisabled,
        border: `5px solid ${thumbColor}`,
        marginTop: -6,
        marginLeft: -2,
        '&:focus, &:hover, &$active': {
            boxShadow: '0px 0px 16px 12px rgba(0,0,0,0.05);',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 4,
        borderRadius: 4,
        color: barLeft,
    },
    rail: {
        height: 4,
        borderRadius: 4,
        color: barColor,
        opacity: 1,
    },
})(Slider);

export const PrettoSliderMainDisabled = withStyles({
    root: {
        //color: 'white',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: thumbColorInsideDisabled,
        border: `6px solid ${thumbColor}`,
        marginTop: -8,
        marginLeft: -6,
        '&:focus, &:hover, &$active': {
            boxShadow: `${'inherit'}`,
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
        color: barLeftDisabled,
    },
    rail: {
        height: 8,
        borderRadius: 4,
        color: barLeftDisabled,
        opacity: 0.4,
    },
})(Slider);

export const PrettoSliderLoad = withStyles({
    root: {
        //color: 'white',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: 'transparent',
        border: `6px solid transparent`,
        marginTop: -8,
        marginLeft: -6,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
        color: barLeftLoader,
    },
    rail: {
        height: 8,
        borderRadius: 4,
        color: barColor,
        opacity: 1,
    },
})(Slider);

export const PrettoSliderMain = withStyles({
    root: {
        //color: 'white',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: thumbColorInside,
        border: `6px solid ${thumbColor}`,
        marginTop: -8,
        marginLeft: -6,
        '&:focus, &:hover, &$active': {
            boxShadow: `${'0px 0px 16px 12px rgba(0,0,0,0.05);'}`,
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
        color: barLeft,
    },
    rail: {
        height: 8,
        borderRadius: 4,
        color: barColorReady,
        opacity: 1,
    },
})(Slider);

export const VolumeSlider = withStyles({
    root: {
        //color: 'white',
        height: 4,
    },
    thumb: {
        height: 16,
        width: 16,
        backgroundColor: thumbColorInside,
        border: `5px solid ${thumbColor}`,
        marginTop: -6,
        marginLeft: -2,
        '&:focus, &:hover, &$active': {
            boxShadow: '0px 0px 16px 12px rgba(0,0,0,0.05);',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 4,
        borderRadius: 4,
        color: barLeft,
    },
    rail: {
        height: 4,
        borderRadius: 4,
        color: grey,
        opacity: 1,
    },
})(Slider);

export const VolumeSliderDisabled = withStyles({
    root: {
        //color: 'white',
        height: 4,
    },
    thumb: {
        height: 16,
        width: 16,
        backgroundColor: thumbColorInsideDisabled,
        border: `5px solid ${thumbColor}`,
        marginTop: -6,
        marginLeft: -2,
        '&:focus, &:hover, &$active': {
            boxShadow: 'none',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 4,
        borderRadius: 4,
        color: thumbColorInsideDisabled,
    },
    rail: {
        height: 4,
        borderRadius: 4,
        color: thumbColorInsideDisabled,
        opacity: 1,
    },
})(Slider);
