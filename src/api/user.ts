import { request } from '@/utils/request/request';

export interface LoginData {
  username: string;
  password: string;
  captcha: string;
  captchaId: string;
}

enum Api {
  //用户
  Login = '/api/login',
}

export const login = (params: LoginData) => request.post(Api.Login, params);



export default {
  login
};
