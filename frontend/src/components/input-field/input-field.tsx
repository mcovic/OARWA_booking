import { Stack, type StackProps, TextField, Typography } from '@mui/material';
import type { ChangeEventHandler } from 'react';

// ----------------------------------------------------------------------

interface InputFieldProps {
    label: string;
    inputId: string;
    placeholder: string;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    type?: string;
    error?: string;
    stackProps?: StackProps;
}

export default function InputField({
    label,
    inputId,
    placeholder,
    value,
    onChange,
    type = 'text',
    error,
    stackProps = {},
}: InputFieldProps) {

    return (
        <Stack spacing={0.5} {...stackProps}>
            <Typography component={'label'} htmlFor={inputId}>{label}</Typography>
            <TextField
                type={type}
                id={inputId}
                name={inputId}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            {error && <Typography color={'error'} variant={'body2'}>{error}</Typography>}
        </Stack>
    );
}
