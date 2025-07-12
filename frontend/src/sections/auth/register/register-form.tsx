import { useAuthContext } from '@hooks/use-auth-context.ts';
import { Box, Button, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { paths } from '@routes/paths.ts';
import { z } from 'zod';
import type { UserRegisterDataDTO } from '../../../../../shared/DTO/user.dto.ts';
import type { SingleValidationError } from '../../../types/common.ts';
import InputField from '@components/input-field/input-field.tsx';

// ----------------------------------------------------------------------

export default function RegisterForm() {
    const [ userData, setUserData ] = useState<UserRegisterDataDTO>({
        first_name: '',
        last_name: '',
        username: '',
        password: '',
    });
    const [ validationError, setValidationError ] = useState<SingleValidationError>({
        field: '',
        message: '',
    });
    const [ error, setError ] = useState('');

    const { register } = useAuthContext();

    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const registerValidationSchema = z.object({
        first_name: z.string().nonempty('Unesite ime').min(2, 'Barem 2 znaka'),
        last_name: z.string().nonempty('Unesite prezime').min(2, 'Barem 2 znaka'),
        username: z.string().nonempty('Unesite korisničko ime').min(3, 'Barem 3 znaka'),
        password: z.string()
            .nonempty('Unesite lozinku')
            .min(8, 'Barem 8 znakova')
            .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Mora sadržavati barem jedno slovo i jedan broj'),
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setValidationError({
            field: '',
            message: '',
        });
        setError('');

        try {
            registerValidationSchema.parse(userData);
            await register(userData);

            navigate(paths.home.root);
        } catch (err: any) {
            if (err instanceof z.ZodError) {
                setValidationError({
                    field: String(err.issues[0].path[0]),
                    message: err.issues[0].message,
                });
            } else {
                setError(err.response?.data?.error || 'Greška prilikom registracije. Pokušajte ponovno.');
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
                        label="Ime"
                        inputId="first_name"
                        placeholder="Unesite ime"
                        value={userData.first_name}
                        onChange={handleInputChange}
                        error={validationError.field === 'first_name' ? validationError.message : ''}
                        stackProps={{ minWidth: { xs: 230, sm: 350 }}}
                    />
                    <InputField
                        label="Prezime"
                        inputId="last_name"
                        placeholder="Unesite prezime"
                        value={userData.last_name}
                        onChange={handleInputChange}
                        error={validationError.field === 'last_name' ? validationError.message : ''}
                    />
                    <InputField
                        label="Korisničko ime"
                        inputId="username"
                        placeholder="Unesite korisničko ime"
                        value={userData.username}
                        onChange={handleInputChange}
                        error={validationError.field === 'username' ? validationError.message : ''}
                    />
                    <InputField
                        label="Lozinka"
                        type="password"
                        inputId="password"
                        placeholder="Unesite lozinku"
                        value={userData.password}
                        onChange={handleInputChange}
                        error={validationError.field === 'password' ? validationError.message : ''}
                    />

                    {error && <Typography color={'error'} variant={'body2'}>{error}</Typography>}
                    <Button
                        type="submit"
                        variant={'contained'}
                    >
                        Registracija
                    </Button>
                </Stack>
            </form>
        </Box>
    );
}
