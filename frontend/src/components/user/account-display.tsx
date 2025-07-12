import { useAuthContext } from '@hooks/use-auth-context.ts';
import { Icon } from '@iconify/react';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Button, Stack, Typography } from '@mui/material';
import { paths } from '@routes/paths.ts';
import { useLocation } from 'react-router';
import EmptyProfileImg from '@assets/empty_profile.jpg';

// ---------------------------------------------------------------

const MENU_OPTIONS = [
    // { label: 'Edit profile', linkTo: paths.users.edit },
    { label: 'Uredi profil', linkTo: paths.home.root },
];

type AccountDisplayProps = {
    handleNavigate: (path: string, targetId?: string) => void;
}

export default function AccountDisplay({
    handleNavigate,
}: AccountDisplayProps) {

    const { user, logout } = useAuthContext();

    const { pathname } = useLocation();

    const handleLogout = async () => {

        try {

            await logout();

            handleNavigate(pathname);

        } catch (error) {

            console.error('Error while logging out:', error);

        }

    };

    return (
        <Accordion disableGutters sx={{
            mx: 2,
        }}>
            <AccordionSummary
                expandIcon={<Icon icon={'charm:arrow-down'} />}
                aria-controls='account-header-accordion-details'
                id='account-header-accordion'
                sx={{
                    px: 1.5,
                    py: 0.25,
                    '& .MuiAccordionSummary-content': { my: 0, py: 1 },
                }}>
                <Avatar>
                    <img src={EmptyProfileImg} alt='profile' height={'40px'} width={'40px'} />
                </Avatar>
                <Typography variant='subtitle2' sx={{ alignSelf: 'center', ml: 1.25 }}>
                    {`${user?.first_name} ${user?.last_name}`}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Stack spacing={2}>
                    {MENU_OPTIONS && MENU_OPTIONS.map((option, index) => (
                        <Button
                            key={index}
                            fullWidth
                            onClick={() => handleNavigate(option.linkTo)}
                            sx={{
                                justifyContent: 'flex-start',
                                color: 'text.secondary',
                                fontWeight: '600',
                            }}
                        >
                            {option.label}
                        </Button>
                    ))}
                    <Button
                        fullWidth
                        onClick={handleLogout}
                        sx={{
                            justifyContent: 'flex-start',
                            fontWeight: '600',
                        }}
                    >
                        Odjava
                    </Button>
                </Stack>
            </AccordionDetails>
        </Accordion>
    );

}
