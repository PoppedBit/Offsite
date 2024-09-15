import { TODO } from 'shared/types';

export const baseUrl = import.meta.env.VITE_API_URL;

const tokenString = import.meta.env.VITE_AUTH_TOKEN;

export const getRequestConfig = () => {
  const token = localStorage.getItem(tokenString);

  let authorization: TODO = {};
  if (token) {
    authorization['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...authorization
    }
  };

  return config as RequestInit;
};

export const getPostConfig = (data: any) => {
  const token = localStorage.getItem(tokenString);

  let authorization: TODO = {};
  if (token) {
    authorization['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...authorization
    },
    body: JSON.stringify(data)
  };

  return config as RequestInit;
};

export const getDeleteConfig = (data: any) => {
  const token = localStorage.getItem(tokenString);

  let authorization: TODO = {};
  if (token) {
    authorization['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method: 'DELETE',
    mode: 'cors',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...authorization
    },
    body: JSON.stringify(data)
  };

  return config as RequestInit;
};

export const getPatchConfig = (data: any) => {
  const token = localStorage.getItem(tokenString);

  let authorization: TODO = {};
  if (token) {
    authorization['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...authorization
    },
    body: JSON.stringify(data)
  };

  return config as RequestInit;
};
