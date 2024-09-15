import { AppBar, Drawer, Grid, List, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { primaryColor } from 'shared/styles/colors';
import { Close } from '@mui/icons-material';

export const StyledAppBar = styled(AppBar)({
  backgroundColor: primaryColor,
  boxShadow: 'none',
  height: '64px',
  lineHeight: '64px'
});

export const SiteTitleLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'none'
});

export const MainGrid = styled(Grid)({
  textAlign: 'center'
});

export const MainTypopgraphy = styled(Typography)({
  lineHeight: '64px',
  fontSize: '32px'
});

export const RightGrid = styled(Grid)({
  textAlign: 'right'
});

export const NavDrawer = styled(Drawer)({});

export const NavDrawerHeader = styled('div')({
  height: '64px',
  backgroundColor: primaryColor,
  color: '#FFFFFF',
  textAlign: 'right',
  cursor: 'pointer',
  display: 'grid',
  alignItems: 'center',
  justifyItems: 'end',
  padding: '10px 15px'
});

export const NavDrawerCloseIcon = styled(Close)({
  float: 'right'
});

export const NavDrawerContent = styled('div')({
  width: '250px',
  position: 'relative',
  height: '100vh'
});

export const NavDrawerActions = styled(List)({
  position: 'absolute',
  bottom: 0,
  width: '250px'
});
