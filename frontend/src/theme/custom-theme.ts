import { createTheme } from '@mui/material';

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
    }
});

export default customTheme;
