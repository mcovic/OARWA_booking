import { Box } from '@mui/material';
import LoginHolder from '@sections/auth/login/login-holder.tsx';

// ----------------------------------------------------------------------

export default function LoginPage() {
    return (
        <>
            <title>Prijava</title>

            <Box sx={{
                display: 'grid',
                placeContent: 'center',
                height: 1,
            }}>
                <LoginHolder />
            </Box>
        </>
    );
}
