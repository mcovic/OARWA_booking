import { Box, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function Page403() {

    return (
        <>
            <title>403 Forbidden</title>

            <Box sx={{
                display: 'grid',
                placeContent: 'center',
                height: 1,
            }}>
                <Typography variant={'h3'}>
                    You do not have permission to access this page.
                </Typography>
            </Box>
        </>
    );

}
