
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import { Login } from './views';
import './styles/app.scss';

import { createTheme, ThemeProvider } from '@mui/material/styles';

// Define your custom theme
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#3f51b5',
//     },
//     secondary: {
//       main: '#f50057',
//     },
//   },
// });

// Seahawk theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#002d72',
    },
    secondary: {
      main: '#0072ce',
    },
  },
});

// Pastel theme
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#f8bbd0',
//     },
//     secondary: {
//       main: '#ff80ab',
//     },
//   },
// });




const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Offsite</Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default App;
