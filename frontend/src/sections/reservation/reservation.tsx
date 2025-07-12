import { Box, Stack, Typography } from '@mui/material';
import ReservationForm from '@sections/reservation/reservation-form.tsx';

// ----------------------------------------------------------------------

export default function Reservation() {

    return (
        <Box
            sx={{
                pt: { xs: 12, sm: 16 },
                pb: 10,
            }}
        >
            <Stack spacing={6} textAlign={'center'} alignItems={'center'}>
                <Typography variant={'h1'}>
                    Želite rezervirati termin?
                </Typography>
                <ReservationForm />
            </Stack>
        </Box>
    );

}