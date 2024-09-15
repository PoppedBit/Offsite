import { useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';

import { PageHeader } from 'shared/components';
import { RegisterForm } from './styles';
import { useNavigate } from 'react-router-dom';
import { useRegister } from './hooks';

const Register = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { isSubmitting, handleSubmit: handleSubmitRegister } = useRegister();

  return (
    <>
      <PageHeader links={[]} text="Register" />
      <RegisterForm onSubmit={handleSubmit(handleSubmitRegister)}>
        <TextField label="Username" fullWidth {...register('username', { required: true })} />
        <TextField
          label="Email"
          fullWidth
          {...register('email', { required: false })}
          autoComplete="email"
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          {...register('password', { required: true })}
        />
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          {...register('confirmPassword', { required: true })}
        />
        <Button variant="contained" type="submit" disabled={isSubmitting}>
          Register
        </Button>
        <Button onClick={() => navigate(`${import.meta.env.VITE_BASE_URL}/login`)}>
          Already have an account? Log in
        </Button>
      </RegisterForm>
    </>
  );
};

export default Register;
