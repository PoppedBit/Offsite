import { Divider, Form, PageHeader } from 'shared/components';
import { useForm } from 'react-hook-form';
import { Button, TextField, Typography } from '@mui/material';
import { CirclePicker } from 'react-color';
import { useAccountSettings } from 'hooks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TODO } from 'shared/types';
import { User } from 'types';
import { setErrorMessage } from 'store/slices/notifications';

const Settings = () => {
  const dispatch = useDispatch();
  const { isLoading, isSubmitting, handleGetSettings, handleSubmitUsername, handleSubmitPassword } = useAccountSettings();
  const user: User = useSelector((state: TODO) => state.user);

  const { username, originalUsername, email, emailVerified, nameColor } = user;

  const {
    register: registerUsername,
    handleSubmit: submitUserName,
    setValue: setUsernameValue,
    reset: resetUsername
  } = useForm();
  const { register: registerPassword, handleSubmit: submitPassword } = useForm();

  useEffect(() => {
    handleGetSettings();
  }, []);

  useEffect(() => {
    resetUsername({
      username,
      nameColor
    });
  }, [user]);

  const onSubmitUsername = (data: TODO) => {
    const { username, nameColor } = data;
    handleSubmitUsername(username, nameColor);
  };

  const onSubmitPassword = (data: TODO) => {
    const { oldPassword, newPassword, confirmPassword } = data;

    if (newPassword !== confirmPassword) {
      dispatch(setErrorMessage('Passwords do not match'));
      return;
    }

    handleSubmitPassword(oldPassword, newPassword);
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      <PageHeader text="Settings" links={[]} />
      <Form onSubmit={submitUserName(onSubmitUsername)}>
        <Typography>
          Your original username will always stay reserved for you: {originalUsername}
        </Typography>
        <TextField
          label="Username"
          fullWidth
          {...registerUsername('username', { required: true })}
        />
        <TextField
          label="Username Color"
          fullWidth
          {...registerUsername('nameColor', { required: true })}
        />
        <CirclePicker
          onChange={(color) => {
            setUsernameValue('nameColor', color.hex);
          }}
        />
        <Typography>Preview: {username} (TODO:Color)</Typography>
        <Button variant="contained" type="submit" disabled={Boolean(isSubmitting)}>
          Update Username
        </Button>
      </Form>
      <Divider />
      <Form onSubmit={submitPassword(onSubmitPassword)}>
        <TextField
          label="Old Password"
          type="password"
          fullWidth
          {...registerPassword('oldPassword', { required: true })}
          autoComplete="current-password"
        />
        <TextField
          label="New Password"
          type="password"
          fullWidth
          {...registerPassword('newPassword', { required: true })}
        />
        <TextField
          label="Confirm New Password"
          type="password"
          fullWidth
          {...registerPassword('confirmPassword', { required: true })}
        />
        <Button variant="contained" type="submit" disabled={Boolean(isSubmitting)}>
          Update Password
        </Button>
      </Form>
    </>
  );
};

export default Settings;
