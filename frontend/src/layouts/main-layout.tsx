import { Navbar } from '@layouts/index.ts';
import { Box } from '@mui/material';
import { Outlet } from 'react-router';

// ----------------------------------------------------------------------

export default function MainLayout() {

    return (
        <Box
            component={'main'}
            sx={{
                height: 1,
                display: 'flex',
                flexDirection: 'column',
                px: { xs: 2, sm: 3, lg: 4 },
                py: 2,
            }}
        >
            <Navbar />

            <Box
                sx={{
                    flexGrow: 1,
                }}
            >
                <Outlet/>
            </Box>
        </Box>
    );

}
