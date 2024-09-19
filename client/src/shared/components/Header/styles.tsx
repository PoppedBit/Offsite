import { AppBar, Grid, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const StyledAppBar = styled(AppBar)({
  boxShadow: 'none',
  height: '64px',
  lineHeight: '64px'
});

export const SiteTitleLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'none'
});

export const MainGrid = styled(Grid)({
  // textAlign: 'center'
});

export const MainTypopgraphy = styled(Typography)({
  lineHeight: '64px',
  fontSize: '32px'
});

export const RightGrid = styled(Grid)({
  textAlign: 'right',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end'
});

export const AccountLink = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: 'inherit',
  textDecorationColor: 'none'
});

export const AccountLinkText = styled(Typography)({
  marginLeft: '8px',
  color: 'inherit',
  textDecoration: 'none'
});
