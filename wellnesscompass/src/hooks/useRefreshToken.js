import axios from '../app/api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get('/refresh', {
      withCredentials: true
    });
    setAuth(previousState => {
      console.log(JSON.stringify(previousState));
      console.log(response.data.accessToken);
      return { ...previousState, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  }
  return refresh;
}

export default useRefreshToken