import axios from 'axios';

const callApi = async (method: string, path: string, data?: any) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const baseUrl = 'http://133.186.210.223:3003/api';
  const fullUrl = `${baseUrl}${path}`;
  console.log(method, fullUrl, data, {headers});
  if (method === 'get' || method === 'delete') {
    return axios[method](fullUrl, {headers});
  } else {
    return axios[method](fullUrl, data, {headers});
  }
};

const oldApi = async (method: string, path: string, data?: any) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const baseUrl = 'http://133.186.210.223:80/api/v2';
  const fullUrl = `${baseUrl}${path}`;
  console.log(method, fullUrl, data, {headers});
  if (method === 'get' || method === 'delete') {
    return axios[method](fullUrl, {headers});
  } else {
    return axios[method](fullUrl, data, {headers});
  }
};

export default {
  help: () => callApi('post', '/auth/help/'),
  help2: () => callApi('get', '/auth/gethelpinfo2/'),
  logIn: (data: any) => oldApi('post', '/Auth/signin2/', data),
  signUp: (data: any) => oldApi('post', '/Auth/signup3/', data),
  findPwd: (data: any) => oldApi('post', '/Member/changepwd3/', data),
  getSMS: (data: any) => oldApi('post', '/Auth/get_appSMS', data),
  checkSMS: (data: any) => oldApi('post', '/Auth/checkSMS/', data),
  checkApp: (data: any) => oldApi('post', '/Auth/checkApp/', data),
};
