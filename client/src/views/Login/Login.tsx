import { useForm } from 'react-hook-form';
import { Typography, } from '@mui/material';
import { Container, Form, LoginButton, LoginLink, LoginTextField } from './styles';

const Login = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    // Handle form submission logic here
  };

  return (
    <Container>
      <Typography variant="h2">Welcome Back</Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <LoginTextField
          id="usernameOrEmail"
          label="Username or Email"
          type="text"
          {...register('usernameOrEmail')}
        />
        <LoginTextField
          id="password"
          label="Password"
          type="password"
          {...register('password')}
        />
        <div>
          <LoginLink href="/forgot">Forgot Password</LoginLink>
        </div>
        <LoginButton type="submit" variant="contained">Sign In</LoginButton>
      </Form>
      <Typography>
        Don't have an account? <LoginLink href="/register">Register</LoginLink>
      </Typography>
    </Container>
  );
};

export default Login;