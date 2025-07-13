import { useAuthContext } from '@hooks/use-auth-context.ts';
import { Button, Stack, Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { paths } from '@routes/paths.ts';
import api, { endpoints } from '@utils/axios.ts';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

// ----------------------------------------------------------------------

const MAX_DATE = new Date();
MAX_DATE.setMonth(MAX_DATE.getMonth() + 1);

const isWeekend = (date: Date): boolean => {
    const day = date.getDay();

    return day === 0 || day === 6; // 0 = Sunday, 6 = Saturday
};

export default function ReservationForm() {

    const [ dateTime, setDateTime ] = useState<Date | null>(null);
    const [ existingReservations, setExistingReservations ] = useState<Date[]>([]);

    const { isAuthenticated } = useAuthContext();

    const navigate = useNavigate();

    const getExistingReservations = async () => {

        try {

            const response = await api.get(endpoints.reservations.reservationDates);
            const dates: Date[] = response.data.map((dateObj: { date: string }) => new Date(dateObj.date));
            setExistingReservations(dates);

        } catch (error) {
            console.error('Error fetching reservation dates:', error);
            setExistingReservations([]);
        }

    };

    useEffect(() => {

        getExistingReservations();

    }, [ isAuthenticated ]);

    const handleSubmit = async () => {
        if (!dateTime) return;

        try {

            await api.post(endpoints.reservations.all, {
                date: dateTime.toISOString(),
            });

            setDateTime(null);
            await getExistingReservations();

        } catch (error) {

            console.error('Greška prilikom slanja rezervacije:', error);

        }
    };

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
                views={[ 'month', 'day', 'hours' ]}
                format={'dd. LLLL, HH:mm'}
                value={dateTime}
                onChange={(newValue) => setDateTime(newValue)}
                disabled={!isAuthenticated}
                disablePast
                maxDate={MAX_DATE}
                shouldDisableDate={isWeekend}
                shouldDisableTime={(timeValue, view) => {
                    return existingReservations.some((reserved) => {
                        const sameDay =
                            reserved.getFullYear() === timeValue.getFullYear() &&
                            reserved.getMonth() === timeValue.getMonth() &&
                            reserved.getDate() === timeValue.getDate();

                        if (!sameDay) return false;

                        // If hour view: disable the reserved hour and hours before 8 am and after 8 pm
                        if (view === 'hours') {
                            return reserved.getHours() === timeValue.getHours();
                        }

                        // If minute view: disable all minutes of the reserved hour
                        if (view === 'minutes') {
                            return reserved.getHours() === timeValue.getHours();
                        }

                        return false;
                    });
                }}
            />
            <Button
                variant={'contained'}
                sx={{
                    maxWidth: 250,
                    alignSelf: 'center',
                    mt: '3rem !important',
                }}
                disabled={!isAuthenticated || !dateTime}
                onClick={handleSubmit}
            >
                Da, želim rezervirati
            </Button>
        </Stack>
    );

}