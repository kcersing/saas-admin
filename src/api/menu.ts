import { request } from '@/utils/request/request';

enum Api {
  GetUserMenu = '/api/admin/menu/role',
  GetMenuTree= '/api/admin/menu/tree',
  SetAuthMenu='/api/admin/authority/menu/update',
}

export const getUserMenu = () => request.post(Api.GetUserMenu);
export const getMenuTree = () => request.post(Api.GetMenuTree);
export const setAuthMenu = (params: object) => request.post(Api.SetAuthMenu, params);

export default {
  getUserMenu,
  getMenuTree,
  setAuthMenu,
};