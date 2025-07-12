import { Stack, Typography } from '@mui/material';
import { paths } from '@routes/paths.ts';
import { Link } from 'react-router';

// ----------------------------------------------------------------------

export default function RegisterActions() {
    return (
        <Stack textAlign={'center'} spacing={2}>
            <Typography>
                Već imate račun? <Link to={paths.auth.login} style={{ textDecoration: 'none', color: 'orangered' }}>Prijavite se</Link>
            </Typography>
            <Typography>
                <Link to={paths.home.root} style={{ textDecoration: 'none', color: 'orange' }}>Povratak na početnu</Link>
            </Typography>
        </Stack>
    );
}
