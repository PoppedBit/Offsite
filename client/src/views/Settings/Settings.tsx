import { Divider, Form, PageHeader } from 'shared/components';
import { useForm } from 'react-hook-form';
import { Button, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { CirclePicker } from 'react-color';
import { useAccountSettings } from 'hooks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TODO } from 'shared/types';
import { User } from 'types';
import { setErrorMessage } from 'store/slices/notifications';
import { getUserPFP } from 'shared/utils';
import { AccountCircle, Delete } from '@mui/icons-material';
import { PFPAvatar } from './styles';

const Settings = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    isSubmitting,
    handleGetSettings,
    handleSubmitUsername,
    handleUpdatePFP,
    handleDeletePFP,
    handleSubmitPassword
  } = useAccountSettings();
  const user: User = useSelector((state: TODO) => state.user);

  const { username, originalUsername, email, emailVerified, nameColor, pfp } = user;

  const {
    register: registerUsername,
    handleSubmit: submitUserName,
    setValue: setUsernameValue,
    reset: resetUsername
  } = useForm();
  const { register: registerPFP, reset: resetPFP } = useForm();
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

  const onSubmitPFP = (file: File) => {
    handleUpdatePFP(file);
    resetPFP();
  };

  const handleClickDeletePFP = () => {
    handleDeletePFP();
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

  if (!user.id) {
    return <Typography>Error: User not found</Typography>;
  }

  return (
    <>
      <PageHeader text="Settings" />
      <section>
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
          <Button variant="contained" type="submit" disabled={isSubmitting === 'username'}>
            Update Username
          </Button>
        </Form>
      </section>
      <Divider />
      <section>
        <Typography>Email: {email}</Typography>
        <Typography>Email Verified: {emailVerified ? 'Yes' : 'No'}</Typography>
      </section>
      <Divider />
      <section>
        <Form>
          <PFPAvatar src={getUserPFP(user.id)}>
            <AccountCircle />
          </PFPAvatar>
          {pfp.length > 0 && (
            <Typography>
              {pfp}
              <Tooltip title="Delete Profile Picture" placement='top'>
                <IconButton onClick={handleClickDeletePFP} disabled={isSubmitting === 'pfp'}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Typography>
          )}
          <Button variant="contained" component="label" disabled={isSubmitting === 'pfp'}>
            Upload File
            <input
              type="file"
              hidden
              {...registerPFP('file', { required: true })}
              accept="image/*"
              onChange={(e) => {
                const file = e.target?.files?.[0]; // Access the file directly from the event
                if (file) {
                  // Trigger the form submission manually
                  onSubmitPFP(file);
                }
              }}
              disabled={Boolean(isSubmitting)}
            />
          </Button>
        </Form>
      </section>
      <Divider />
      <section>
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
          <Button variant="contained" type="submit" disabled={isSubmitting === 'password'}>
            Update Password
          </Button>
        </Form>
      </section>
    </>
  );
};

export default Settings;
