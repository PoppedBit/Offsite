import styled from '@emotion/styled';
import { Check } from '@mui/icons-material';
import { Divider as MuiDivider } from '@mui/material';

export const Divider = styled(MuiDivider)({
  margin: '15px 0px'
});

export const Form = styled('form')({
  textAlign: 'center',
  margin: '0px auto 15px auto',

  '& > .MuiFormControl-root': {
    marginTop: '15px'
  },

  '.ninja-field': {
    display: 'none'
  },

  '& > button': {
    marginTop: '15px'
  }
});

export const GreenCheck = styled(Check)({
  color: '#34b233'
});
