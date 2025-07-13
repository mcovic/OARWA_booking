import { Box } from '@mui/material';
import Reservation from '@sections/reservation/reservation.tsx';

// ----------------------------------------------------------------------

export default function ReservationPage() {

    return (
        <>
            <title>Rezervacija</title>

            <Box sx={{
                height: 1,
            }}>
                <Reservation />
            </Box>
        </>
    );

}