import { baseUrl, getRequestConfig } from "shared/api";

export const requestUsers = async () => {
  const config = getRequestConfig();
  return await fetch(`${baseUrl}/admin/users`, config);
};