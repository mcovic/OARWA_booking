import { Stack, Typography } from '@mui/material';
import RegisterActions from '@sections/auth/register/register-actions.tsx';
import RegisterForm from '@sections/auth/register/register-form.tsx';

// ----------------------------------------------------------------------

export default function RegisterHolder() {

    return (
        <Stack spacing={6}>
            <Typography variant={'h2'} textAlign={'center'}>
                Registracija
            </Typography>

            <RegisterForm />

            <RegisterActions />
        </Stack>
    );
}
