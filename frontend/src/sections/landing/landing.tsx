import { Box, Button, Stack, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function Landing() {

    return (
        <Box
            sx={{
                pt: { xs: 14, sm: 18 },
                pb: 10,
                display: 'grid',
                placeContent: 'center',
            }}
        >
            <Stack spacing={6} textAlign={'center'}>
                <Typography variant={'h1'}>
                    Dobrodošli!
                </Typography>
                <Typography variant={'h2'}>
                    Ovo je vaš novi najdraži frizerski salon!
                </Typography>
                <Button
                    size={'large'}
                    variant={'outlined'}
                    color={'primary'}
                    sx={{
                        width: 'max-content',
                        alignSelf: 'center',
                        px: 10,
                        mt: '5rem !important',
                    }}
                > {/* TODO navigate na narucivanje */}
                    Naruči termin!
                </Button>
            </Stack>
        </Box>
    );

}