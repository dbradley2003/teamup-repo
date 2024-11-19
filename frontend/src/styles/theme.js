import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import '../styles/fonts.css'
// Create a theme instance.
export const theme = createTheme({

  typography: {
    fontFamily: "'Lato', 'Arial', sans-serif",
    h1: {
      fontFamily: "'Lato-Bold', sans-serif",
    },
    h5: {
      fontFamily: "'Lato-Bold', sans-serif",
    },
    h4: {
      fontFamily: "'Lato-Bold', sans-serif",
    },
    h6: {
      fontFamily: "'Lato-Bold', sans-serif",
    },
    body2: {
      fontFamily: "'Lato-Regular', sans-serif",
    },
    body1: {
      fontFamily: "'Lato-Regular', sans-serif",
    },
    subtitle2: {
      fontFamily: "'Lato-Regular', sans-serif",
    },
    subtitle: {
      fontFamily: "'Lato-Regular', sans-serif",
    },
    button: {
      fontFamily: "'Lato-Bold', sans-serif",
    },
  },

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
      default: '#EFF0F9', // Default background color (white)
    },
  },
});

export default theme;
