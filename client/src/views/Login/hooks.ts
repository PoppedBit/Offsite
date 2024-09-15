import { requestLogin } from './api';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setErrorMessage } from 'store/slices/notifications';
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