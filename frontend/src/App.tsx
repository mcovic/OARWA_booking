import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router';
import Router from './router.tsx';
import customTheme from './theme/custom-theme.ts';

// --------------------------------------------------------------------------

export default function App() {

    return (
        <ThemeProvider theme={customTheme}>
            <CssBaseline/>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </ThemeProvider>
    )
}