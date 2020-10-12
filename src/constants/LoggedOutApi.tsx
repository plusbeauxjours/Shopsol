import axios from 'axios';

const callApi = async (method: string, path: string, data?: any) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const baseUrl = 'http://133.186.210.223:3003/api';
  const fullUrl = `${baseUrl}${path}`;
  if (method === 'get' || method === 'delete') {
    return axios[method](fullUrl, {headers});
  } else {
    return axios[method](fullUrl, data, {headers});
  }
};

const oldApi = async (
  method: string,
  path: string,
  data?: any,
  isImg?: boolean,
) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const baseUrl = 'http://133.186.210.223:80/api/v2';
  const fullUrl = `${baseUrl}${path}`;

  if (method === 'get' || method === 'delete') {
    console.log(fullUrl);
    return axios[method](fullUrl, {headers});
  } else {
    if (isImg) {
      console.log(fullUrl, data);
      return axios[method](fullUrl, data, {headers});
    } else {
      console.log(fullUrl, data);
      return axios[method](fullUrl, data, {headers});
    }
  }
};

export default {
  signUp: (data: any) => oldApi('post', '/Auth/signup3/', data),
  findPwd: (data: any) => oldApi('post', '/Member/changepwd3/', data),
  getSMS: (data: any) => oldApi('post', '/Auth/get_appSMS/', data),
  checkSMS: (data: any) => oldApi('post', '/Auth/checkSMS/', data),
  help: () => callApi('post', '/auth/help/'),
  help2: () => callApi('get', '/auth/gethelpinfo2/'),
  logIn: (data: any) => oldApi('post', '/Auth/signin2/', data),
  checkApp: (data: any) => oldApi('post', '/Auth/checkApp/', data),
};
