import { baseUrl, getPostConfig } from 'shared/api';

export const requestLogin = async (identifier: string, password: string) => {
  const data = {
    identifier,
    password
  };
  const postConfig = getPostConfig(data);
  return await fetch(`${baseUrl}/login`, postConfig);
};