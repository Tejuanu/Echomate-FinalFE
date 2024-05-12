import axios from "axios";
import env from "utils/config/env";
import store from "src/redux/store";
import { startLoading, stopLoading } from "src/redux/reducers/loading.reducer";

const dispatch = store.dispatch;

axios.interceptors.request.use(
  (config) => {
    dispatch(startLoading());
    config.baseURL = env.REACT_APP_API;
    return config;
  },
  (error) => {
    dispatch(stopLoading());
    throw new Error(error.message);
  }
);

axios.interceptors.response.use(
  (response) => {
    dispatch(stopLoading());
    return response;
  },
  (error) => {
    dispatch(stopLoading());
    throw error.message;
  }
);

export default axios;
