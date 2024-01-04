import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: 'rgb(243, 244, 249)',
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    allVariants: {
      color: 'rgb(18, 31, 67)'
    },
    h6: {
      fontWeight: '500',
      fontSize: '0.9rem',
    },
    h5: {
        fontWeight: '600',
        fontSize: '1.0rem',
    },
  },
});

export default theme;