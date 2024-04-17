import { request } from '@umijs/max';
import { BaseDataResp,Menus } from './typings.d';

enum Apis {
  GetMenuListByRole = '/api/admin/menu/role',
  GetAllMenu = '/api/admin/menu/list',
  CreateOrAddMenu = '/api/admin/menu/create',
  CreateOrUpdateMenu = '/api/admin/menu/update',
  DeleteMenu = '/api/admin/menu',
  CreateOrUpdateMenuParam = '/api/menu/param/create_or_update',
  DeleteMenuParam = '/api/menu/param/delete',
  GetMenuParamsByMenuId = '/api/admin/menu/param/list',
  
}

/** 获取菜单列表 */
export async function getMenuList(
  options?: { [key: string]: any },
) {
  return request<BaseDataResp<Menus.RoleMenuResp>>(Apis.GetMenuListByRole, {
    method: 'GET',
    params: {},
    ...(options || {}),
  });
}


// export const getMenuList = () => {
//   return defHttp.get<BaseDataResp<RoleMenuResp>>({ url: Api.GetMenuListByRole });
// };

// /**
//  *  author: ryan
//  *  @description: Get all the menus
//  */

// export const getAllMenu = (params?: MenuParams) => {
//   return defHttp.get<BaseDataResp<MenuListResp>>({ url: Api.GetAllMenu, params });
// };


// /**
//  *  author: ryan
//  *  @description: Create a new menu
//  */
// export const CreateOrAddMenu = (
//   params: CreateOrUpdateMenuReq,
//   mode: ErrorMessageMode = 'message',
// ) => {
//   return defHttp.post<BaseResp>(
//     { url: Api.CreateOrAddMenu, params: params },
//     {
//       errorMessageMode: mode,
//     },
//   );
// };

// /**
//  *  author: ryan
//  *  @description: Create a new menu
//  */
// export const createOrUpdateMenu = (
//   params: CreateOrUpdateMenuReq,
//   mode: ErrorMessageMode = 'message',
// ) => {
//   return defHttp.post<BaseResp>(
//     { url: Api.CreateOrUpdateMenu, params: params },
//     {
//       errorMessageMode: mode,
//     },
//   );
// };

// /**
//  *  author: Ryan Su
//  *  @description: Delete a menu
//  */
// export const deleteMenu = (params: BaseIdReq, mode: ErrorMessageMode = 'message') => {
//   return defHttp.delete<BaseResp>(
//     { url: Api.DeleteMenu, params: params },
//     {
//       errorMessageMode: mode,
//     },
//   );
// };

// /**
//  *  author: ryan
//  *  @description: Create a new menu parameter for the menu
//  */
// export const createOrUpdateMenuParam = (
//   params: CreateOrUpdateMenuParamReq,
//   mode: ErrorMessageMode = 'message',
// ) => {
//   return defHttp.post<BaseResp>(
//     { url: Api.CreateOrUpdateMenuParam, params: params },
//     {
//       errorMessageMode: mode,
//     },
//   );
// };

// /**
//  *  author: Ryan Su
//  *  @description: Delete a menu parameter
//  */
// export const deleteMenuParam = (params: BaseIdReq, mode: ErrorMessageMode = 'message') => {
//   return defHttp.post<BaseResp>(
//     { url: Api.DeleteMenuParam, params: params },
//     {
//       errorMessageMode: mode,
//     },
//   );
// };

// /**
//  *  author: Ryan Su
//  *  @description:
//  */
// export const getMenuParamListByMenuId = (params: BaseIdReq, mode: ErrorMessageMode = 'message') => {
//   return defHttp.post<BaseDataResp<MenuParamList>>(
//     { url: Api.GetMenuParamsByMenuId, params: params },
//     {
//       errorMessageMode: mode,
//     },
//   );
// };




























// export interface RouteItem {
//   path: string;
//   component: any;
//   meta: RouteMeta;
//   name?: string;
//   alias?: string | string[];
//   redirect?: string;
//   caseSensitive?: boolean;
//   children?: RouteItem[];
// }

// /**
//  *  author: ryan
//  *  @description: Get menu by page
//  */
// export interface MenuPageResp {
//   total: number;
//   data: RouteItem[];
// }

// /**
//  *  author: ryan
//  *  @description: menu params for get all menu api
//  */

// export type MenuParams = {
//   menuName?: string;
//   status?: string;
// };

// /**
//  *  author: ryan
//  *  @description: the items for menu list table
//  */
// export interface MenuListItem {
//   id: number;
//   type: number;
//   trans: string;
//   parentId: number;
//   path: string;
//   name: string;
//   redirect: string;
//   component: string;
//   orderNo: number;
//   disabled: boolean;
//   title: string;
//   icon: string;
//   hideMenu: boolean;
//   hideBreadcrumb: boolean;
//   currentActiveMenu: string;
//   ignoreKeepAlive: boolean;
//   hideTab: boolean;
//   frameSrc: string;
//   carryParam: boolean;
//   hideChildrenInMenu: boolean;
//   affix: boolean;
//   dynamicLevel: number;
//   realPath: string;
//   children: MenuListItem[];
//   meta: any;
// }

// /**
//  *  author: ryan
//  *  @description: menu list response model
//  */
// export type MenuListResp = BaseListResp<MenuListItem>;

// /**
//  *  author: ryan
//  *  @description: create menu reqest model
//  */
// export interface CreateOrUpdateMenuReq {
//   id: number;
//   menuType: number;
//   parentId: number;
//   path: string;
//   name: string;
//   redirect: string;
//   component: string;
//   orderNo: number;
//   disabled: boolean;
//   title: string;
//   icon: string;
//   hideMenu: boolean;
//   hideBreadcrumb: boolean;
//   currentActiveMenu: string;
//   ignoreKeepAlive: boolean;
//   hideTab: boolean;
//   frameSrc: string;
//   carryParam: boolean;
//   hideChildrenInMenu: boolean;
//   affix: boolean;
//   dynamicLevel: number;
//   realPath: string;
// }

// /**
//  * @description: Get menu return value
//  */
// export type RoleMenuResp = BaseListResp<RouteItem>;

// /**
//  *  author: Ryan Su
//  *  @description: Create or update a extra menu parameter request
//  */
// export interface CreateOrUpdateMenuParamReq {
//   id: number;
//   dataType: string;
//   menuId: number;
//   value: string;
//   key: string;
// }

// /**
//  *  author: Ryan Su
//  *  @description: Menu extra parameter information
//  */
// export interface MenuParamInfo extends CreateOrUpdateMenuParamReq {
//   createdAt: number;
//   updatedAt: number;
// }

// /**
//  *  author: Ryan Su
//  *  @description: Menu parameters list
//  */
// export interface MenuParamList {
//   total: number;
//   data: MenuParamInfo[];
// }
