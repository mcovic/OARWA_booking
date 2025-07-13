import { useAuthContext } from '@hooks/use-auth-context.ts';
import { Box, Stack, Typography } from '@mui/material';
import ReservationList from '@sections/reservation-list/reservation-list.tsx';
import { RoleEnum } from '../../../../shared/enums/RoleEnum.ts';

// ----------------------------------------------------------------------

export default function ReservationListHolder() {

    const { user } = useAuthContext();

    return (
        <Box
            sx={{
                pt: { xs: 6, sm: 8 },
                pb: 10,
            }}
        >
            <Stack spacing={6} textAlign={'center'} alignItems={'center'}>
                <Typography variant={'h2'}>
                    {
                        user?.role_id?.id === RoleEnum.USER
                            ? 'Popis mojih rezervacija'
                            : 'Popis svih rezervacija'
                    }
                </Typography>
                <ReservationList />
            </Stack>
        </Box>
    );

}