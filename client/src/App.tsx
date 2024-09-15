
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Account, Login, Register } from './views';
import 'shared/styles/App.scss';
import {
  setErrorMessage,
  setSuccessMessage,
  setConfirmationMessage
} from 'store/slices/notifications';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { TODO } from 'shared/types';
import { Dialog, Snackbars, Loading, } from 'shared/components';
import { Home, Person, Settings } from '@mui/icons-material';

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

  const dispatch = useDispatch();
  const {
    success: successMessage,
    error: errorMessage,
    confirmation: confirmationMessage,
    isLoading: isLoadingMessage
  } = useSelector((state: TODO) => state.notifications);

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Offsite</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ paddingTop: '2rem' }}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </BrowserRouter>
        <Loading isVisible={isLoadingMessage !== null} message={isLoadingMessage ?? ''} />
        <Snackbars
          successMessage={successMessage}
          setSuccessMessage={(message: string) => dispatch(setSuccessMessage(message))}
          errorMessage={errorMessage}
          setErrorMessage={(message: string) => dispatch(setErrorMessage(message))}
        />
        <Dialog
          isOpen={confirmationMessage !== null}
          onClose={() => {
            dispatch(setConfirmationMessage(null));
          }}
          title={confirmationMessage?.title ?? 'Are you sure?'}
          fullWidth={false}
          buttons={
            <>
              <Button
                variant="contained"
                onClick={() => {
                  confirmationMessage?.onConfirm();
                  dispatch(setConfirmationMessage(null));
                }}
              >
                Submit
              </Button>
              <Button
                onClick={() => {
                  dispatch(setConfirmationMessage(null));
                }}
              >
                Cancel
              </Button>
            </>
          }
        >
          {confirmationMessage?.children}
        </Dialog>
      </Container>
      <BottomNavigation
        showLabels
      >
        <BottomNavigationAction label="Home" icon={<Home />} />
        <BottomNavigationAction label="Profile" icon={<Person />} />
        <BottomNavigationAction label="Settings" icon={<Settings />} />
      </BottomNavigation>
    </ThemeProvider>
  );
};

export default App;
