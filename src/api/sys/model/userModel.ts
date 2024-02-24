/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string
  password: string
  captcha: string
  captchaId: string
}

export interface RoleInfo {
  roleName: string
  value: string
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number
  token: string
  role: RoleInfo
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[]
  id: number
  // 用户id
  userId: string | number
  // 用户名
  username: string
  // 昵称
  nickname: string
  // 头像
  avatar: string
  // 介绍
  desc?: string
}

export interface CaptchaResp {
  id: string
  b64s: string
}

export interface UserListReq {
  page: number
  pageSize: number
  username: string
  nickname: string
  email: string
  mobile: string
}

export interface UserInfo {
  ID: number
  UUID?: string
  username: string
  nickname: string
  email: string
  mobile: string
  roleId: number
  avatar: string
  status: number
  password?: string
  createdAt?: number
  updatedAt?: number
}

export interface UserListResp {
  total: number
  data: UserInfo[]
}

export interface UserProfile {
  avatar: string
  nickname: string
  email: string
  mobile: string
}

export interface ChangePasswordReq {
  userID: string
  oldPassword: string
  newPassword: string
}
