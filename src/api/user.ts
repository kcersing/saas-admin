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
  UserUpdate = '/api/admin/user/update',


  Logout = '/api/admin/token',
  GetPermCode = '/api/admin/user/perm',
  GetCaptcha = '/api/captcha',
  CreateOrAddUser = '/api/admin/user/create',
  DeleteUser = '/api/admin/user',
  SetUserStatus = '/api/admin/user/status',
  GetProfile = '/api/admin/user/profile',
  ChangePassword = '/api/admin/user/change-password',
  SetRole = '/api/admin/user/set-role',
  UserCreate = '/api/admin/user/create',


  SetDefaultVenue = '/api/admin/user/set-default-venue',
}

export const login = (params: LoginData) => request.post(Api.Login, params);

export const userInfo = () => request.get(Api.UserInfo);

export const userList = (params: object) => request.post(Api.UserList,params);

export const userUpdate = (params: object) => request.post(Api.UserUpdate,params);

export const changePassword = (params: object) => request.post(Api.ChangePassword, params)

export const userCreate = (params: object) => request.post(Api.UserCreate, params);

export const setRole = (params: object) => request.post(Api.SetRole, params);
export const setDefaultVenue = (params: object) => request.post(Api.SetDefaultVenue, params);


export default {
  login,
  userInfo,
  userList,
  userUpdate,
  userCreate,
  changePassword,
  setRole,
  setDefaultVenue
};
