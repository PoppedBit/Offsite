import { baseUrl, getPostConfig } from 'shared/api';

export interface RequestRegister {
  username: string;
  email: string;
  password: string;
}

export const requestRegister = async (data: RequestRegister) => {
  const postConfig = getPostConfig(data);
  return await fetch(`${baseUrl}/register`, postConfig);
};