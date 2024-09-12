import { Button, Link, TextField } from '@mui/material';
import styled from 'styled-components';

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const LoginTextField = styled(TextField)`
  width: 100%;
`;

export const LoginButton = styled(Button)`
    width: 100%;
`;

export const LoginLink = styled(Link)`
  color: blue;
`;