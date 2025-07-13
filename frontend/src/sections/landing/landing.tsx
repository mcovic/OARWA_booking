import { Box, Button, Stack, Typography } from '@mui/material';
import { paths } from '@routes/paths.ts';
import { useNavigate } from 'react-router';

// ----------------------------------------------------------------------

export default function Landing() {

    const navigate = useNavigate();

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
                    onClick={() => navigate(paths.reservation.root)}
                    sx={{
                        width: 'max-content',
                        alignSelf: 'center',
                        px: 10,
                        mt: '5rem !important',
                    }}
                >
                    Naruči termin!
                </Button>
            </Stack>
        </Box>
    );

}