
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
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
import { Home, Login as LoginIcon, Logout, Person, PersonAdd, Settings } from '@mui/icons-material';
import { useCheckSession } from 'views/Login/hooks';
import { useEffect } from 'react';

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

const App = () => {

  const dispatch = useDispatch();
  const { handleSubmit: handleCheckSession } = useCheckSession();

  const user = useSelector((state: TODO) => state.user);
  const {
    success: successMessage,
    error: errorMessage,
    confirmation: confirmationMessage,
    isLoading: isLoadingMessage
  } = useSelector((state: TODO) => state.notifications);

  useEffect(() => {
    handleCheckSession();
  }, []);

  console.log('user', user);

  const isAuthenticated = Boolean(user.id);

  let bottomNavigationItems = [
    <BottomNavigationAction 
      key='home'
      label="Home" 
      icon={<Home />} 
      component={Link} 
      to="/" />
  ];

  if (isAuthenticated) {
    bottomNavigationItems.push(
      <BottomNavigationAction key="profile" label="Profile" icon={<Person />} component={Link} to={`/@${user.username}`} />,
      <BottomNavigationAction key="account" label="Settings" icon={<Settings />} component={Link} to="/account" />,
      <BottomNavigationAction key="logout" label="Logout" icon={<Logout />} component={Link} to="/logout" />
    );
  } else {
    bottomNavigationItems.push(
      <BottomNavigationAction key="login" label="Login" icon={<LoginIcon />} component={Link} to="/login" />,
      <BottomNavigationAction key="register" label="Register" icon={<PersonAdd />} component={Link} to="/register" />
    );
  }

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Offsite</Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md" sx={{ paddingTop: '2rem' }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<Account />} />
          </Routes>
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
        <BottomNavigation showLabels>
          {bottomNavigationItems}
        </BottomNavigation>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
