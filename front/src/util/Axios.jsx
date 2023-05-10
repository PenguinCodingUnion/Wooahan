import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === `developement`
      ? `https://k8b206.p.ssafy.io`
      : `https://k8b206.p.ssafy.io`,

  timeout: 2000,

  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

instance.interceptors.request.use(
  // 요청 전
  (config) => {
    //깡통맨
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  //response 후
  (config) => {
    //깡통
    return config.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
