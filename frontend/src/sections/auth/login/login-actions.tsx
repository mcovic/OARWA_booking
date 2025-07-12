import { Stack, Typography } from '@mui/material';
import { paths } from '@routes/paths.ts';
import { Link } from 'react-router';

// ----------------------------------------------------------------------

export default function LoginActions() {
    return (
        <Stack textAlign={'center'} spacing={2}>
            <Typography>
                Nemate račun? <Link to={paths.auth.register} style={{ textDecoration: 'none', color: 'orangered' }}>Registrirajte se</Link>
            </Typography>
            <Typography>
                <Link to={paths.home.root} style={{ textDecoration: 'none', color: 'orange' }}>Povratak na početnu</Link>
            </Typography>
        </Stack>
    );
}
