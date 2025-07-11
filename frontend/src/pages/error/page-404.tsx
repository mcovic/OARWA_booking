import { Box, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function Page404() {

    return (
        <>
            <title>404 Page Not Found</title>

            <Box sx={{
                display: 'grid',
                placeContent: 'center',
                height: 1,
            }}>
                <Typography variant={'h3'}>
                    The page you are looking for does not exist.
                </Typography>
            </Box>
        </>
    );

}
