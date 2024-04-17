export interface BaseDataResp<T> {
  code: number;
  message: string;
  total: number;
  data: T;
}
export interface BaseListResp<T> {
  data: T[];
  code: number;
  message: string;
  total: number;
}
export interface BaseIdReq {
  id: number;
}

export interface BaseIdsReq {
  ids: number[];
}

declare namespace Sys {

  type ImgCaptchaResponse= {
    captchaId?:number ;
    imgPath?: string;
  };
}


declare namespace Login {

  type LoginParamsReq ={
    username: string;
    password: string;
    captcha: string;
    captchaId: string;
  }

  type LoginResult  = {
    status?: string;
    type?: string;
    currentAuthority?: string;

    userId: string | number;
    token: string;
    role: RoleInfo;
  };
}





declare namespace Menus {

type RoleMenuResp = BaseListResp<RouteItem>

type RouteItem = {
  path: string;
  component: any;
  meta: RouteMeta;
  name?: string;
  alias?: string | string[];
  redirect?: string;
  caseSensitive?: boolean;
  children?: RouteItem[];
}


}
declare namespace User {

  type RoleInfo = {
  roleName: string;
  value: string;
}




type GetUserInfoModel = {
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

type UserListReq = {
  page: number;
  pageSize: number;
  username: string;
  nickname: string;
  email: string;
  mobile: string;
}

type UserInfo = {
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

type UserListResp ={
  total: number;
  data: UserInfo[];
}


type ChangePasswordReq = {
  userID: string;
  oldPassword: string;
  newPassword: string;
}


}
