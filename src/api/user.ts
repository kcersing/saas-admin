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

  UserInfo ='/api/admin/user/info',
  UserList = '/api/admin/user/list',
  UserUpdate = ' /api/admin/user/update'


}

export const login = (params: LoginData) => request.post(Api.Login, params);

export const userInfo = () => request.get(Api.UserInfo);

export const userList = (params: object) => request.post(Api.UserList,params);

export const userUpdate = (params: object) => request.post(Api.UserUpdate,params);
export default {
  login,
  userInfo,
  userList,
  userUpdate,
};
