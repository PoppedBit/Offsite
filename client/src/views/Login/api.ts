import { baseUrl, getPostConfig, getRequestConfig } from 'shared/api';

export const requestLogin = async (identifier: string, password: string) => {
  const data = {
    identifier,
    password
  };
  const postConfig = getPostConfig(data);
  return await fetch(`${baseUrl}/login`, postConfig);
};

export const requestCheckSession = async () => {
  const config = getRequestConfig();
  return await fetch(`${baseUrl}/check-session`, config);
};

export const requestLogout = async () => {
  const config = getRequestConfig();
  return await fetch(`${baseUrl}/logout`, config);
};