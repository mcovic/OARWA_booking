import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router';
import { AuthProvider } from './providers/auth-context.tsx';
import Router from './router.tsx';
import customTheme from './theme/custom-theme.ts';

// --------------------------------------------------------------------------

export default function App() {

    return (
        <AuthProvider>
            <ThemeProvider theme={customTheme}>
                <CssBaseline/>
                <BrowserRouter>
                    <Router />
                </BrowserRouter>
            </ThemeProvider>
        </AuthProvider>
    )
}