import InputField from '@components/input-field/input-field.tsx';
import { useAuthContext } from '@hooks/use-auth-context.ts';
import { Box, Button, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { paths } from '@routes/paths.ts';
import { z } from 'zod';
import type { UserLoginDataDTO } from '../../../../../shared/DTO/user.dto.ts';
import type { SingleValidationError } from '../../../types/common.ts';

// ----------------------------------------------------------------------

export default function LoginForm() {
    const [ credentials, setCredentials ] = useState<UserLoginDataDTO>({
        username: '',
        password: '',
    });
    const [ error, setError ] = useState('');
    const [ validationError, setValidationError ] = useState<SingleValidationError>({
        field: '',
        message: '',
    });
    const { login } = useAuthContext();

    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const loginValidationSchema = z.object({
        username: z.string().nonempty('Morate unijeti korisničko ime').min(3, 'Barem 3 znaka'),
        password: z.string().nonempty('Morate unijeti lozinku').min(8, 'Barem 8 znakova'),
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setValidationError({
            field: '',
            message: '',
        });
        setError('');

        try {
            loginValidationSchema.parse(credentials);
            await login(credentials);

            navigate(paths.home.root);
        } catch (err: any) {
            if (err instanceof z.ZodError) {
                setValidationError({
                    field: String(err.issues[0].path[0]),
                    message: err.issues[0].message,
                });
            } else {
                setError(err.response?.data?.error || 'Greška prilikom prijave. Pokušajte ponovno.');
            }
        }
    };

    return (
        <Box sx={{
            border: '1px solid white',
            borderRadius: 2,
            px: 4,
            py: { xs: 4, sm: 8 },
        }}>
            <form onSubmit={handleSubmit} noValidate>
                <Stack spacing={3}>
                    <InputField
                        label="Korisničko ime"
                        inputId="username"
                        placeholder="Unesite korisničko ime"
                        value={credentials.username}
                        onChange={handleInputChange}
                        error={validationError.field === 'username' ? validationError.message : ''}
                        stackProps={{ minWidth: { xs: 230, sm: 350 }}}
                    />
                    <InputField
                        label="Lozinka"
                        type="password"
                        inputId="password"
                        placeholder="Unesite lozinku"
                        value={credentials.password}
                        onChange={handleInputChange}
                        error={validationError.field === 'password' ? validationError.message : ''}
                        stackProps={{ minWidth: { xs: 230, sm: 350 }}}
                    />

                    {error && <Typography color={'error'} variant={'body2'}>{error}</Typography>}
                    <Button
                        type="submit"
                        variant={'contained'}
                    >
                        Prijava
                    </Button>
                </Stack>
            </form>
        </Box>
    );
}
