import styled from '@emotion/styled';
import { Container } from '@mui/material';
import { primaryColor } from 'shared/styles/colors';

export const FooterContainer = styled(Container)({
  textAlign: 'center',
  backgroundColor: primaryColor,
  color: '#FFFFFF',
  height: '32px',
  marginLeft: 'auto',
  marginRight: 'auto',

  a: {
    textDecoration: 'none',
    color: '#FFFFFF'
  }
});
