import axios from "../app/api/axios";
import useAuth from "./useAuth";

// This is a test comment

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    try {
      const response = await axios('/logout', {
        withCredentials: true
      });
    } catch (err) {
      console.error(err);
    }
  }
  return logout;
}

export default useLogout