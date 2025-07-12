import { Stack, Typography } from '@mui/material';
import LoginActions from '@sections/auth/login/login-actions.tsx';
import LoginForm from '@sections/auth/login/login-form.tsx';

// ----------------------------------------------------------------------

export default function LoginHolder() {

    return (
        <Stack spacing={6}>
            <Typography variant={'h2'} textAlign={'center'}>
                Prijava
            </Typography>

            <LoginForm />

            <LoginActions />
        </Stack>
    );
}
