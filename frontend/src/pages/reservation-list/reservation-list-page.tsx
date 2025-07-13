import LoadingScreen from '@components/loading/loading-screen.tsx';
import { useAuthContext } from '@hooks/use-auth-context.ts';
import { Box } from '@mui/material';
import { paths } from '@routes/paths.ts';
import ReservationListHolder from '@sections/reservation-list/reservation-list-holder.tsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

// ----------------------------------------------------------------------

export default function ReservationListPage() {

    const { isAuthenticated } = useAuthContext();

    const navigate = useNavigate();

    // redirect to login page if not authenticated
    useEffect(() => {

        if (!isAuthenticated) {
            navigate(paths.auth.login, { replace: true });
        }

    })

    if (!isAuthenticated) {
        return <LoadingScreen />;
    }

    return (
        <>
            <title>Popis rezervacija</title>

            <Box sx={{
                height: 1,
            }}>
                <ReservationListHolder />
            </Box>
        </>
    );

}