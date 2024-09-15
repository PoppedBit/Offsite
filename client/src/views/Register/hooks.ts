import { requestRegister } from './api';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setErrorMessage, setSuccessMessage } from 'store/slices/notifications';
import { TODO } from 'shared/types';

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
