import { CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router';
import { AuthProvider } from './providers/auth-context.tsx';
import Router from './router.tsx';
import customTheme from './theme/custom-theme.ts';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { hr } from 'date-fns/locale/hr'

// --------------------------------------------------------------------------

export default function App() {

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={hr}>
            <AuthProvider>
                <ThemeProvider theme={customTheme}>
                    <CssBaseline/>
                    <BrowserRouter>
                        <SnackbarProvider anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}>
                            <Router />
                        </SnackbarProvider>
                    </BrowserRouter>
                </ThemeProvider>
            </AuthProvider>
        </LocalizationProvider>
    )
}