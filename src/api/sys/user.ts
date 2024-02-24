/*
 * @Author: GS\Administrator wt4@live.cn
 * @Date: 2024-02-22 10:24:15
 * @LastEditors: GS\Administrator wt4@live.cn
 * @LastEditTime: 2024-02-24 15:02:17
 * @FilePath: \vben-admin\src\api\sys\user.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defHttp } from '/@/utils/http/axios'
import {
  LoginParams,
  LoginResultModel,
  GetUserInfoModel,
  CaptchaResp,
  UserListReq,
  UserListResp,
  UserInfo,
  UserProfile,
  ChangePasswordReq,
} from './model/userModel'

import { ErrorMessageMode } from '/#/axios'
import { BaseDataResp, BaseResp } from '../model/baseModel'
enum Api {
  TestRetry = '/testRetry',

  Login = '/api/login',
  Logout = '/api/admin/token',
  GetUserInfo = '/api/admin/user/info',
  GetPermCode = '/api/admin/user/perm',
  GetCaptcha = '/api/captcha',
  GetUserList = '/api/admin/user/list',
  CreateOrAddUser = '/api/admin/user/create',
  CreateOrUpdateUser = '/api/admin/user/update',
  DeleteUser = '/api/admin/user',
  SetUserStatus = '/api/admin/user/status',
  GetProfile = '/api/admin/user/profile',
  ChangePassword = '/api/admin/user/change-password',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<BaseDataResp<LoginResultModel>>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  )
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' })
}

export function getPermCode() {
  return defHttp.post<string[]>({ url: Api.GetPermCode })
}

export function doLogout() {
  return defHttp.post({ url: Api.Logout })
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  )
}

export function getCaptcha(mode: ErrorMessageMode = 'message') {
  return defHttp.post<BaseDataResp<CaptchaResp>>(
    {
      url: Api.GetCaptcha,
    },
    {
      errorMessageMode: mode,
    },
  )
}
export const getUserList = (params: UserListReq) => {
  return defHttp.get<BaseDataResp<UserListResp>>({ url: Api.GetUserList, params })
}
export const createOrAddUser = (params: UserInfo, mode: ErrorMessageMode = 'message') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrAddUser, params: params },
    {
      errorMessageMode: mode,
    },
  )
}
export const createOrUpdateUser = (params: UserInfo, mode: ErrorMessageMode = 'message') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrUpdateUser, params: params },
    {
      errorMessageMode: mode,
    },
  )
}
export const setUserStatus = (id: number, status: number) =>
  defHttp.post({ url: Api.SetUserStatus, params: { id, status } })
export function getUserProfile() {
  return defHttp.get<BaseDataResp<UserProfile>>(
    { url: Api.GetProfile },
    { errorMessageMode: 'message' },
  )
}
export function updateProfile(params: UserProfile) {
  return defHttp.post<BaseResp>({ url: Api.GetProfile, params }, { errorMessageMode: 'message' })
}

export function changePassword(params: ChangePasswordReq) {
  return defHttp.post<BaseResp>(
    { url: Api.ChangePassword, params },
    { errorMessageMode: 'message' },
  )
}
