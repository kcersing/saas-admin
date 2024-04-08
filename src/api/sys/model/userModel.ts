/*
 * @Author: GS\Administrator wt4@live.cn
 * @Date: 2024-03-13 11:38:20
 * @LastEditors: GS\Administrator wt4@live.cn
 * @LastEditTime: 2024-03-16 17:15:50
 * @FilePath: \vben-admin\src\api\sys\model\userModel.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * @description: Login interface parameters
 */
export interface LoginReq {
  username: string;
  password: string;
  captcha: string;
  captchaId: string;
}

/**
 * @description: Register interface parameters
 */
export interface RegisterReq {
  username: string;
  password: string;
  email: string;
  captcha: string;
  captchaId: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResp {
  userId: string | number;
  token: string;
  role: RoleInfo;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  id: number;
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 昵称
  nickname: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
}

export interface CaptchaResp {
  id: string;
  imgPath: string;
  captchaId: string;
}

export interface UserListReq {
  page: number;
  pageSize: number;
  username: string;
  nickname: string;
  email: string;
  mobile: string;
}

export interface UserInfo {
  id: number;
  UUID?: string;
  username: string;
  nickname: string;
  email: string;
  mobile: string;
  roleId: number;
  avatar: string;
  status: number;
  password?: string;
  createdAt?: number;
  updatedAt?: number;
}

export interface UserListResp {
  total: number;
  data: UserInfo[];
}

export interface UserProfile {
  avatar: string;
  nickname: string;
  email: string;
  mobile: string;
}

export interface ChangePasswordReq {
  userID: string;
  oldPassword: string;
  newPassword: string;
}
