import { useAuthContext } from '@hooks/use-auth-context.ts';
import { Button, Stack, Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { paths } from '@routes/paths.ts';
import { useState } from 'react';
import { useNavigate } from 'react-router';

// ----------------------------------------------------------------------

export default function ReservationForm() {

    const [ dateTime, setDateTime ] = useState<Date | null>(null);

    const { isAuthenticated } = useAuthContext();

    const navigate = useNavigate();

    return (
        <Stack spacing={2} sx={{
            border: '1px solid white',
            borderRadius: 2,
            px: 4,
            py: { xs: 4, sm: 8 },
            width: { xs: 300, sm: 550, md: 700, lg: 800 }
        }}>
            {!isAuthenticated && (
                <Stack spacing={1} mb={'2rem !important'}>
                    <Typography variant={'h6'} color={'error'}>
                        Morate se prijaviti kako biste rezervirali termin:
                    </Typography>
                    <Button
                        variant={'outlined'}
                        color={'error'}
                        onClick={() => navigate(paths.auth.login)}
                        sx={{
                            maxWidth: 250,
                            alignSelf: 'center',
                        }}
                    >
                        Prijavi se
                    </Button>
                </Stack>
            )}
            <Typography variant={'h6'}>
                Odaberite termin
            </Typography>
            <DateTimePicker
                value={dateTime}
                onChange={(newValue) => setDateTime(newValue)}
                disabled={!isAuthenticated}
            />
            <Button
                variant={'contained'}
                sx={{
                    maxWidth: 250,
                    alignSelf: 'center',
                    mt: '3rem !important',
                }}
                disabled={!isAuthenticated}
            >
                Da, želim rezervirati
            </Button>
        </Stack>
    );

}