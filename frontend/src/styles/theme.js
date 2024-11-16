import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
export const theme = createTheme({
  palette: {
    primary: {
      main: '#2D3A6E', // Custom primary color (blue)
    },
    secondary: {
      main: '#19857b', // Custom secondary color (teal)
    },
    error: {
      main: red.A400, // Custom error color (red)
    },
    background: {
      default: '#fff', // Default background color (white)
    },
  },
});

export default theme;
