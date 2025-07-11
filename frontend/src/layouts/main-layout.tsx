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
            }}
        >
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
