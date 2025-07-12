import { Box } from '@mui/material';
import RegisterHolder from '@sections/auth/register/register-holder.tsx';

// ----------------------------------------------------------------------

export default function RegisterPage() {
    return (
        <>
            <title>Registracija</title>

            <Box sx={{
                display: 'grid',
                placeContent: 'center',
                height: 1,
            }}>
                <RegisterHolder />
            </Box>
        </>
    );
}
