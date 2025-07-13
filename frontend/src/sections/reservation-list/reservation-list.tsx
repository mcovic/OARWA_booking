import { useAuthContext } from '@hooks/use-auth-context.ts';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import api, { endpoints } from '@utils/axios.ts';
import { format } from 'date-fns';
import { Fragment, useEffect, useState } from 'react';
import type { ReservationDto } from '../../../../shared/DTO/reservation.dto.ts';
import { RoleEnum } from '../../../../shared/enums/RoleEnum.ts';

// ----------------------------------------------------------------------

export default function ReservationList() {

    const [ reservations, setReservations ] = useState<ReservationDto[]>([]);

    const { user } = useAuthContext();
    const isAdmin = user?.role_id?.id === RoleEnum.ADMIN;

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
                        </ListItem>
                    </Fragment>
                ))}
            </List>
        </Box>
    );

}