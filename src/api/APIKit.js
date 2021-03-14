// import axios from 'axios';

// let APIKit = axios.create({
//     baseURL: process.env.BACKEND_URL,
//     timeout: 10000
// })

// export default APIKit;

import axios from 'axios';

// Create axios client, pre-configured with baseURL
let APIKit = axios.create({
  baseURL: 'https://got-english-backend-production-swiyh5bc4q-de.a.run.app',
  timeout: 10000,
});

// Set JSON Web Token in Client to be included in all calls
export const setClientToken = token => {
  APIKit.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

export default APIKit;