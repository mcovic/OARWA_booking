import { CssBaseline, ThemeProvider } from '@mui/material';
import customTheme from './theme/custom-theme.ts';

// --------------------------------------------------------------------------

export default function App() {

  return (
      <ThemeProvider theme={customTheme}>
        <CssBaseline/> {/* TODO router */}
      </ThemeProvider>
  )
}