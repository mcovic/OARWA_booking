import AccountDisplay from '@components/user/account-display.tsx';
import { useAuthContext } from '@hooks/use-auth-context.ts';
import { Icon } from '@iconify/react';
import {
    Avatar,
    Box, Button,
    Drawer, IconButton, Link,
    List,
    ListItem,
    ListItemButton,
    ListItemText
} from '@mui/material';
import LogoImg from '@assets/logo.png';
import { paths } from '@routes/paths.ts';
import { Fragment, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

// ----------------------------------------------------------------------

export default function Navbar() {

    const [ openMenu, setOpenMenu ] = useState(false);

    return (
        <Box
            component={'header'}
            sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <Link href={paths.home.root}>
                <Avatar
                    alt={'hair salon logo'}
                    src={LogoImg}
                    variant={'square'}
                    sx={{ width: { xs: 110, sm: 150 }, height: { xs: 120, sm: 120 } }}
                />
            </Link>

            <IconButton onClick={() => setOpenMenu(true)} sx={{ mt: -2 }}>
                <Icon icon={'mingcute:menu-fill'} />
            </IconButton>

            <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
                <Box sx={{ width: 250 }}
                     role="presentation"
                >
                    <NavbarList setOpenMenu={setOpenMenu} />
                </Box>
            </Drawer>
        </Box>
    );

}

// ---------------------------------------------------------

type MenuOption = {
    text: string;
}

type MenuOptionParent = MenuOption & {
    id: number;
    path: string;
};

type NavbarListProps = {
    setOpenMenu: (open: boolean) => void;
}

const NavbarList = ({
    setOpenMenu,
}: NavbarListProps) => {

    const navigate = useNavigate();

    const { isAuthenticated } = useAuthContext();

    const { pathname } = useLocation();

    const menuOptions: MenuOptionParent[] = [
        {
            id: 1,
            text: 'Početna',
            path: paths.home.root,
        },
    ];

    const handleNavigate = (path: string) => {

        if (path !== pathname) {

            navigate(path);

        }

        setOpenMenu(false);
    };

    return (
        <List component={'nav'} disablePadding>
            {menuOptions.map((item, parentIndex) => (
                <Fragment key={parentIndex}>
                    <ListItem
                        disablePadding
                        sx={{
                            mb: parentIndex === (menuOptions.length - 1) ? 2 : 0,
                        }}
                    >
                        <ListItemButton onClick={() => handleNavigate(item.path)}>
                            <ListItemText primary={item.text}/>
                        </ListItemButton>
                    </ListItem>
                </Fragment>
            ))}
            {
                !isAuthenticated
                    ? <Box sx={{
                        position: 'fixed',
                        bottom: 20,
                        right: 15,
                        width: 220,
                    }}>
                        <Button
                            fullWidth
                            variant={'contained'}
                            onClick={() => (navigate(paths.auth.login))}
                        >
                            Prijava
                        </Button>
                    </Box>
                    : <AccountDisplay handleNavigate={handleNavigate}/>
            }
        </List>
    );

}