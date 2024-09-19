import { requestCheckSession, requestLogin, requestLogout, requestRegister } from 'api';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setConfirmationMessage, setErrorMessage, setSuccessMessage } from 'store/slices/notifications';
import { setUser } from 'store/slices/user';
import { TODO } from 'shared/types';

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (data: TODO) => {
    setIsSubmitting(true);

    const { identifier = '', password = '' } = data;

    try {
      const response = await requestLogin(identifier, password);

      if (response.status === 200) {
        dispatch(setUser(undefined));
        // TODO - Where to go on success?
        navigate(`${import.meta.env.VITE_BASE_URL}/`);
      } else {
        const error = await response.text();
        dispatch(setErrorMessage(error));
      }
    } catch (e) {
      console.log(e);
      dispatch(setErrorMessage('An unexpected error occured'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleSubmit
  };
};

export const useCheckSession = () => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await requestCheckSession();

      if (response.status === 200) {
        const data = await response.json();
        dispatch(setUser(data));
      } else {
        const error = await response.text();
        dispatch(setErrorMessage(error));
        dispatch(setUser(null));
      }
    } catch (e) {
      console.log(e);
      dispatch(setErrorMessage('An unexpected error occured'));
      dispatch(setUser(null));
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleSubmit
  };
};

export const useLogout = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setConfirmationMessage({
      title: 'Are you sure you want to logout?',
      onConfirm: handleSubmit
    }));
  }

  const handleSubmit = async () => {
    try {
      const response = await requestLogout();

      if (response.status === 200) {
        dispatch(setUser(null));
        window.location.href = window.location.href;
      } else {
        const error = await response.text();
        dispatch(setErrorMessage(error));
      }
    } catch (e) {
      console.log(e);
      dispatch(setErrorMessage('An unexpected error occured'));
    }
  }
    
  return {
    handleClick,
  };
}

export const useRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (data: TODO) => {
    setIsSubmitting(true);

    const {
      username,
      email,
      password,
      confirmPassword,
    } = data;

    // Email formatted correctly
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.length && !emailRegex.test(email)) {
      dispatch(setErrorMessage('Invalid Email'));
      return;
    }

    // Check username meets requirements
    // ensures that the string starts with an alphanumeric character
    const usernameRegex: RegExp = /^[a-zA-Z0-9](?!.*[.-]{2})[a-zA-Z0-9.-]{1,28}[a-zA-Z0-9]$/;
    if (!usernameRegex.test(username)) {
      dispatch(setErrorMessage('Invalid Username'));
      return;
    }

    // Password meets requirements
    // 8 or more characters
    // 1 letter
    // 1 number
    // 1 special character
    const passwordRegex: RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*\W).{8,}$/;
    if (!passwordRegex.test(password)) {
      dispatch(
        setErrorMessage(
          'Password must have at least 8 characters, with at least 1 letter, number, and special character'
        )
      );
      return;
    }

    // Check passwords match
    if (password !== confirmPassword) {
      dispatch(setErrorMessage('Passwords do not match'));
      return;
    }

    try {
      const response = await requestRegister({
        username,
        email,
        password,
      });

      if (response.status === 201) {
        dispatch(setSuccessMessage(`Account for ${email} created.`));
        navigate(`${import.meta.env.VITE_BASE_URL}/login`);
      } else {
        const error = await response.text();
        dispatch(setErrorMessage(error));
      }
    } catch (e) {
      console.log(e);
      dispatch(setErrorMessage('An unexpected error occured'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleSubmit
  };
};
