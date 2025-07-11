import { type Breakpoint, useMediaQuery, useTheme } from '@mui/material';

// ----------------------------------------------------------------------

type Query = 'up' | 'down';

export const useResponsive = (query: Query, breakpoint: Breakpoint) => {

    const theme = useTheme();

    const mediaUp = useMediaQuery(theme.breakpoints.up(breakpoint));

    const mediaDown = useMediaQuery(theme.breakpoints.down(breakpoint));

    if (query === 'up') {

        return mediaUp;

    }

    return mediaDown;

};
