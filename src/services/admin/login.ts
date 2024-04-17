
import { request } from '@umijs/max';
import { BaseDataResp,Login } from './typings.d';

enum Apis {
  Login = '/api/login',
  OutLogin = '/api/logout',
  RefreshToken = '/api/refresh_token',
  
}

/** 登录接口 POST /api/login */
export async function login(body: Login.LoginParamsReq, options?: { [key: string]: any }) {
  return request<BaseDataResp<Login.LoginResult>>( Apis.Login, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/logout */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>(Apis.OutLogin, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/** 更新token POST /api/refresh_token */
export async function refresh_token(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<Record<string, any>>(Apis.RefreshToken, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
