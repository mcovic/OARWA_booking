import { useAuthContext } from '@hooks/use-auth-context.ts';
import { Icon } from '@iconify/react';
import { Box, Button, Divider, List, ListItem, ListItemText, Typography } from '@mui/material';
import api, { endpoints } from '@utils/axios.ts';
import { format } from 'date-fns';
import { useSnackbar } from 'notistack';
import { Fragment, useEffect, useState } from 'react';
import type { ReservationDto } from '../../../../shared/DTO/reservation.dto.ts';
import { RoleEnum } from '../../../../shared/enums/RoleEnum.ts';

// ----------------------------------------------------------------------

export default function ReservationList() {

    const [ reservations, setReservations ] = useState<ReservationDto[]>([]);

    const { user } = useAuthContext();
    const isAdmin = user?.role_id?.id === RoleEnum.ADMIN;

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {

        (async () => {

            try {

                const response = isAdmin
                    ? await api.get(endpoints.reservations.all)
                    : await api.get(endpoints.reservations.myReservations);
                setReservations(response.data);

            } catch (error) {
                console.error('Error fetching reservations:', error);
                setReservations([]);
            }

        })();

    }, [ user?.id ]);

    const getPrimaryText = (item: ReservationDto, index: number) => {

        if (isAdmin && typeof item.user_id !== 'string') {
            return `Rezervacija ${index + 1} - ${item.user_id?.first_name} ${item.user_id?.last_name}`;
        }

        return `Rezervacija ${index + 1}`;

    };

    const handleDelete = async (reservationId: string) => {

        try {
            await api.delete(endpoints.reservations.single(reservationId));

            setReservations(prev => prev.filter(reservation => reservation._id !== reservationId));

            enqueueSnackbar('Rezervacija uspješno uklonjena', {
                variant: 'success',
            });
        } catch (error) {
            console.error('Error deleting reservation:', error);
            enqueueSnackbar('Greška prilikom uklanjanja rezervacije', {
                variant: 'error',
            });
        }

    };

    if (reservations.length === 0) {
        return (
            <Box sx={{
                border: '1px solid white',
                borderRadius: 2,
                px: 4,
                py: { xs: 2, sm: 4 },
                width: { xs: 300, sm: 550, md: 700, lg: 800 }
            }}>
                <Typography variant={'h4'} color={'error.main'}>
                    {isAdmin ? 'Trenutno nema rezervacija' : 'Nemate rezervacija'}
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{
            border: '1px solid white',
            borderRadius: 2,
            px: 4,
            py: { xs: 2, sm: 4 },
            width: { xs: 300, sm: 550, md: 700, lg: 800 }
        }}>
            <List disablePadding>
                {reservations.map((item, index) => (
                    <Fragment key={index}>
                        <ListItem
                            sx={{
                                mb: index !== (reservations.length - 1) ? 2 : 1,
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                gap: 2,
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <ListItemText
                                primary={getPrimaryText(item, index)}
                                secondary={`Datum i vrijeme: ${format(new Date(item.date), 'd.M.yyyy, HH:mm')}`}
                                slotProps={{
                                    primary: {
                                        variant: 'h3',
                                        color: 'primary.dark',
                                        mb: 1,
                                    },
                                    secondary: {
                                        variant: 'body1',
                                        color: 'text.secondary',
                                    },
                                }}
                            />
                            <Button
                                variant={'contained'}
                                color={'error'}
                                onClick={() => handleDelete(item._id)}
                            >
                                Ukloni &nbsp;
                                <Icon icon={'fluent:delete-32-filled'} width={26} />
                            </Button>
                        </ListItem>
                        {index !== (reservations.length - 1) && <Divider />}
                    </Fragment>
                ))}
            </List>
        </Box>
    );

}