import { Divider, Form, PageHeader } from "shared/components";
import { useForm } from "react-hook-form";
import { Button, TextField, Typography } from "@mui/material";
import { CirclePicker } from "react-color";


const Account = () => {

  const { 
    register: registerUsername, 
    handleSubmit: handleSubmitUsername,
    setValue: setUsernameValue,
  } = useForm();
  const { register: registerPassword, handleSubmit: handleSubmitPassword } = useForm();

  const onSubmitUsername = (data: any) => {
    alert("TODO: Implement username update");
  };

  const onSubmitPassword = (data: any) => {
    alert("TODO: Implement password update");
  };

  return (
    <>
      <PageHeader text="Account" links={[]} />
      <Form onSubmit={handleSubmitUsername(onSubmitUsername)}>
        <Typography>
          Your original username will always stay reserved for you: {"TODO: ORIGINAL USERNAME"}
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
        <Typography>
          Preview: {'TODO: USERNAME'}
        </Typography>
        <Button variant="contained" type="submit">
          Update Username
        </Button>
      </Form>
      <Divider />
      <Form onSubmit={handleSubmitPassword(onSubmitPassword)}>
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
        <Button variant="contained" type="submit">
          Update Password
        </Button>
      </Form>
    </>
  );
};

export default Account;
