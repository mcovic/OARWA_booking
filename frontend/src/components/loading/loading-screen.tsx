import { Box, type BoxProps, LinearProgress } from '@mui/material';

// ----------------------------------------------------------------------

export default function LoadingScreen({ sx, ...other }: BoxProps) {

    return (
        <Box
            sx={{
                width: 1,
                flexGrow: 1,
                minHeight: 1,
                minWidth: { xs: 300, sm: 500 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                ...sx,
            }}
            {...other}
        >
            <LinearProgress color='inherit' sx={{ width: 1, maxWidth: 360 }} />
        </Box>
    );

}
