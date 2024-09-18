import { Avatar, Grid, Toolbar, Typography } from '@mui/material';
import { AccountLink, AccountLinkText, MainGrid, MainTypopgraphy, RightGrid, SiteTitleLink, StyledAppBar } from './styles';
import { useSelector } from 'react-redux';
import { TODO } from 'shared/types';
import { Link } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';


const Header = () => {
  const user = useSelector((state: TODO) => state.user);
  const { id, username } = user;

  const isAuthenticated = Boolean(id);

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Grid container spacing={2}>
          <MainGrid item xs={10}>
            <MainTypopgraphy>
              <SiteTitleLink to="/">{import.meta.env.VITE_TITLE}</SiteTitleLink>
            </MainTypopgraphy>
          </MainGrid>
          <RightGrid item xs={2}>  
            {isAuthenticated && (
              <AccountLink to={`/@${username}`}>
                <Avatar>
                  <AccountCircle />
                </Avatar>
                <AccountLinkText variant="body1">
                  {username}
                </AccountLinkText>
              </AccountLink>
            )}
          </RightGrid>
        </Grid>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
