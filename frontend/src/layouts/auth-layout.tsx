import { Box } from '@mui/material';
import { Outlet } from 'react-router';

// ----------------------------------------------------------------------

export default function AuthLayout() {

    return (
        <Box
            component={'main'}
            sx={{
                height: 1,
            }}
        >
            <Outlet/>
        </Box>
    );

}
