import { defHttp } from '/@/utils/http/axios'
import { ErrorMessageMode } from '/#/axios'

import {
  RoleMenuResp,
  MenuListResp,
  MenuParams,
  CreateOrUpdateMenuReq,
  MenuParamList,
  CreateOrUpdateMenuParamReq,
} from './model/menuModel'
import { BaseDataResp, BaseIdReq, BaseResp } from '/@/api/model/baseModel'
enum Api {
  GetMenuListByRole = '/api/admin/menu/role',
  GetAllMenu = '/api/admin/menu/list',
  CreateOrAddMenu = '/api/admin/menu/create',
  CreateOrUpdateMenu = '/api/admin/menu/update',
  DeleteMenu = '/api/admin/menu',
  CreateOrUpdateMenuParam = '/api/menu/param/create_or_update',
  DeleteMenuParam = '/api/menu/param/delete',
  GetMenuParamsByMenuId = '/api/admin/menu/param/list',
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = () => {
  return defHttp.get<BaseDataResp<RoleMenuResp>>({ url: Api.GetMenuListByRole })
}

/**
 *  author: ryan
 *  @description: Get all the menus
 */

export const getAllMenu = (params?: MenuParams) => {
  return defHttp.get<BaseDataResp<MenuListResp>>({ url: Api.GetAllMenu, params })
}
export const CreateOrAddMenu = (
  params: CreateOrUpdateMenuReq,
  mode: ErrorMessageMode = 'message',
) => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrAddMenu, params: params },
    {
      errorMessageMode: mode,
    },
  )
}
export const createOrUpdateMenu = (
  params: CreateOrUpdateMenuReq,
  mode: ErrorMessageMode = 'message',
) => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrUpdateMenu, params: params },
    {
      errorMessageMode: mode,
    },
  )
}
export const deleteMenu = (params: BaseIdReq, mode: ErrorMessageMode = 'message') => {
  return defHttp.delete<BaseResp>(
    { url: Api.DeleteMenu, params: params },
    {
      errorMessageMode: mode,
    },
  )
}
export const createOrUpdateMenuParam = (
  params: CreateOrUpdateMenuParamReq,
  mode: ErrorMessageMode = 'message',
) => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrUpdateMenuParam, params: params },
    {
      errorMessageMode: mode,
    },
  )
}
export const deleteMenuParam = (params: BaseIdReq, mode: ErrorMessageMode = 'message') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteMenuParam, params: params },
    {
      errorMessageMode: mode,
    },
  )
}
export const getMenuParamListByMenuId = (params: BaseIdReq, mode: ErrorMessageMode = 'message') => {
  return defHttp.get<BaseDataResp<MenuParamList>>(
    { url: Api.GetMenuParamsByMenuId, params: params },
    {
      errorMessageMode: mode,
    },
  )
}
