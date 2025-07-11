import { Box, Stack, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function Landing() {

    return (
        <Box
            sx={{
                py: 10,
                display: 'grid',
                placeContent: 'center',
            }}
        >
            <Stack spacing={2}>
                <Typography variant={'h1'} fontWeight={500}>
                    Dobrodošli!
                </Typography>
            </Stack>
        </Box>
    );

}