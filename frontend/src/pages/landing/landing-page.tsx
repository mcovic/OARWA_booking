import { Box } from '@mui/material';
import Landing from '@sections/landing/landing.tsx';

// ----------------------------------------------------------------------


export default function LandingPage(){
    return(
        <>
            <title>Početna</title>

            <Box sx={{
                height: 1,
            }}>
                <Landing />
            </Box>
        </>
    );
}
