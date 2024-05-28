import { AuthParams } from './auth';
import userMuen from '@/api/menu';
import { useState } from 'react';

export type IRoute = AuthParams & {
  name: string;
  key: string;
  // 当前页是否展示面包屑
  breadcrumb?: boolean;
  children?: IRoute[];
  // 当前路由是否渲染菜单项，为 true 的话不会在菜单中显示，但可通过路由地址访问。
  ignore?: boolean;
};

// let menu = await userMuen.getUserMenu().then((res) => {
//   return res.data;
// });

export const routes: IRoute[] = []