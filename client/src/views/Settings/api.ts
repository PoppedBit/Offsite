import { baseUrl, getRequestConfig } from 'shared/api';

export const requestAccount = async () => {
  const config = getRequestConfig();
  return await fetch(`${baseUrl}/account-settings`, config);
};