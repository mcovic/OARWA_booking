import { createTheme } from '@mui/material';
import { pxToRem, responsiveFontSizes } from './typography.ts';

// ----------------------------------------------------------------------

const COMMON = {
    black: '#000',
    white: '#fff',
};

const PRIMARY = {
    main: '#90caf9',
    light: '#e3f2fd',
    dark: '#42a5f5',
    contrastText: 'rgba(0, 0, 0, 0.87)',
};

const SECONDARY = {
    main: '#ce93d8',
    light: '#f3e5f5',
    dark: '#ab47bc',
    contrastText: 'rgba(0, 0, 0, 0.87)',
};

const ERROR = {
    main: '#f44336',
    light: '#e57373',
    dark: '#d32f2f',
    contrastText: 'fff',
};

const WARNING = {
    main: '#ffa726',
    light: '#ffb74d',
    dark: '#f57c00',
    contrastText: 'rgba(0, 0, 0, 0.87)',
};

const INFO = {
    main: '#29b6f6',
    light: '#4fc3f7',
    dark: '#0288d1',
    contrastText: 'rgba(0, 0, 0, 0.87)',
};

const SUCCESS = {
    main: '#66bb6a',
    light: '#81c784',
    dark: '#388e3c',
    contrastText: 'rgba(0, 0, 0, 0.87)',
};

const GREY = {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
    A100: '#f5f5f5',
    A200: '#eeeeee',
    A400: '#bdbdbd',
    A700: '#616161',
};

const TEXT = {
    primary: '#fff',
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.5)',
};

const ACTION = {
    active: '#fff',
    hover: 'rgba(255, 255, 255, 0.08)',
    selected: 'rgba(255, 255, 255, 0.16)',
    disabled: 'rgba(255, 255, 255, 0.3)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)',
};

const BACKGROUND = {
    default: '#121212',
    paper: '#1e1e1e',
};

const customTheme = createTheme({
    palette: {
        mode: 'dark',
        common: COMMON,
        primary: PRIMARY,
        secondary: SECONDARY,
        error: ERROR,
        warning: WARNING,
        info: INFO,
        success: SUCCESS,
        grey: GREY,
        text: TEXT,
        action: ACTION,
        background: BACKGROUND,
        divider: 'rgba(255, 255, 255, 0.12)',
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        fontWeightRegular: 400,
        fontWeightMedium: 600,
        fontWeightBold: 800,
        h1: {
            fontWeight: 800,
            lineHeight: 80 / 64,
            fontSize: pxToRem(40),
            ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
        },
        h2: {
            fontWeight: 800,
            lineHeight: 64 / 48,
            fontSize: pxToRem(32),
            ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
        },
        h3: {
            fontWeight: 700,
            lineHeight: 1.5,
            fontSize: pxToRem(24),
            ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 }),
        },
        h4: {
            fontWeight: 700,
            lineHeight: 1.5,
            fontSize: pxToRem(20),
            ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 }),
        },
        h5: {
            fontWeight: 700,
            lineHeight: 1.5,
            fontSize: pxToRem(18),
            ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
        },
        h6: {
            fontWeight: 700,
            lineHeight: 28 / 18,
            fontSize: pxToRem(17),
            ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
        },
        subtitle1: {
            fontWeight: 600,
            lineHeight: 1.5,
            fontSize: pxToRem(16),
        },
        subtitle2: {
            fontWeight: 600,
            lineHeight: 22 / 14,
            fontSize: pxToRem(14),
        },
        body1: {
            lineHeight: 1.5,
            fontSize: pxToRem(16),
        },
        body2: {
            lineHeight: 22 / 14,
            fontSize: pxToRem(14),
        },
        caption: {
            lineHeight: 1.5,
            fontSize: pxToRem(12),
        },
        overline: {
            fontWeight: 700,
            lineHeight: 1.5,
            fontSize: pxToRem(12),
            textTransform: 'uppercase',
        },
        button: {
            fontWeight: 700,
            lineHeight: 24 / 14,
            fontSize: pxToRem(14),
            textTransform: 'unset'
        },
    }
});

export default customTheme;
