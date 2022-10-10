//to centralise the api , so we can change the data in every place by changing one place.
import axios from 'axios';
import { BACKEND_API_URL } from '../urlConfig';
import store from '../redux/store';
import { authConstants } from '../redux/actions/constant';

const token = window.localStorage.getItem('sqtoken')
const axiosInstance = axios.create({
  baseURL: BACKEND_API_URL,
  headers: {
    "Content-type": "application/json",
    Authorization: token ? `Bearer ${token}` : '',
  },
});


axiosInstance.interceptors.request.use((req) => {
  const { auth } = store.getState();
  if (auth.token) {
    req.headers.Authorization = `Bearer ${auth.token}`;
  }
  return req;
});
axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const status = error.response ? error.response.status : 500;
    if (status === 500) {
      window.localStorage.removeItem("sqtoken");
      window.localStorage.removeItem("squser");

      store.dispatch({ type: authConstants.LOGOUT_SUCCESS });
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
