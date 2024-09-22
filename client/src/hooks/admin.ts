import { requestUsers } from "api";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { setUsers } from "store/slices/admin";
import { setErrorMessage } from "store/slices/notifications";

export const useAdminUsers = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getUsers = async () => {
    setIsLoading(true);

    try{
      const response = await requestUsers();

      if (response.status === 200) {
        const data = await response.json();
        dispatch(setUsers(data.users));
      } else {
        const error = await response.text();
        dispatch(setErrorMessage(error));
      }
    } catch (e) {
      console.log(e);
      dispatch(setErrorMessage('An unexpected error occured'));    
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    getUsers,
  };
}