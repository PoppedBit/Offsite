import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Avatar, Grid, IconButton, Menu, MenuItem, Toolbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AccountCircle } from '@mui/icons-material';

import { MainGrid, MainTypopgraphy, RightGrid, SiteTitleLink, StyledAppBar } from './styles';
import { TODO } from 'shared/types';
import { clearUser } from 'store/slices/user';
import { NavigationMenu } from './NavigationMenu';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [accountMenuAnchorEl, setAccountMenuAnchorEl] = useState<null | HTMLElement>(null);
  const user = useSelector((state: TODO) => state.user.user);
  const navigation = useSelector((state: TODO) => state.user.navigation);

  const isAuthenticated = user?.id !== undefined;
  const isAccountMenuOpen = Boolean(accountMenuAnchorEl);

  const handleAccountClick = (event: React.MouseEvent<HTMLElement>) => {
    setAccountMenuAnchorEl(event.currentTarget);
  };

  const handleAccountMenuClicked = (href: string) => {
    navigate(href);
    setAccountMenuAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem(import.meta.env.VITE_AUTH_TOKEN);
    dispatch(clearUser());
    setAccountMenuAnchorEl(null);
    navigate('/');
  };

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <NavigationMenu navigation={navigation} />
          </Grid>
          <MainGrid item xs={8}>
            <MainTypopgraphy>
              <SiteTitleLink to="/">Roll-Charts</SiteTitleLink>
            </MainTypopgraphy>
          </MainGrid>
          <RightGrid item xs={2}>
            <IconButton color="inherit" onClick={handleAccountClick}>
              {isAuthenticated ? (
                <Avatar>{user.username[0].toUpperCase()}</Avatar>
              ) : (
                <AccountCircle />
              )}
            </IconButton>
            {/* https://mui.com/material-ui/react-menu/ */}
            <Menu
              anchorEl={accountMenuAnchorEl}
              open={isAccountMenuOpen}
              onClose={() => setAccountMenuAnchorEl(null)}
            >
              {!isAuthenticated && (
                <MenuItem onClick={() => handleAccountMenuClicked('/register')}>Register</MenuItem>
              )}
              {!isAuthenticated && (
                <MenuItem onClick={() => handleAccountMenuClicked('/login')}>Login</MenuItem>
              )}
              {isAuthenticated && (
                <MenuItem onClick={() => handleAccountMenuClicked('/account')}>My Account</MenuItem>
              )}
              {isAuthenticated && <MenuItem onClick={handleLogout}>Logout</MenuItem>}
            </Menu>
          </RightGrid>
        </Grid>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
