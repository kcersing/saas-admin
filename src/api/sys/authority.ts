/*
 * @Author: GS\Administrator wt4@live.cn
 * @Date: 2024-02-27 11:44:06
 * @LastEditors: GS\Administrator wt4@live.cn
 * @LastEditTime: 2024-02-27 11:44:36
 * @FilePath: \vben-admin\src\api\sys\authority.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defHttp } from '/@/utils/http/axios'
import { ErrorMessageMode } from '/#/axios'
import { BaseDataResp, BaseIdReq, BaseResp } from '/@/api/model/baseModel'
import { ApiListResp } from './model/apiModel'
import {
  ApiAuthorityReq,
  ApiListReq,
  MenuAuthorityInfo,
  ApiAuthorityResp,
} from './model/authorityModel'

enum Api {
  CreateOrUpdateApiAuthority = '/api/admin/authority/api/update',
  CreateOrAddMenuAuthority = '/api/admin/authority/menu/create',
  CreateOrUpdateMenuAuthority = '/api/admin/authority/menu/update',
  GetRoleMenuList = '/api/admin/authority/menu/role',

  GetRoleApiList = '/api/admin/authority/api/role',
  GetApiList = '/api/admin/api/list',
}

/**
 *  author: Ryan Su
 *  @description: this function is used to get api list for authorization
 */

export const getApiList = (params: ApiListReq) => {
  return defHttp.get<BaseDataResp<ApiListResp>>({ url: Api.GetApiList, params })
}

/**
 * @description: Get api authorization list
 */

export const getApiAuthority = (params: BaseIdReq) => {
  return defHttp.post<BaseDataResp<ApiAuthorityResp>>({ url: Api.GetRoleApiList, params })
}

/**
 *  author: ryan
 *  @description: create or update api authorization
 */
export const createOrUpdateApiAuthority = (
  params: ApiAuthorityReq,
  mode: ErrorMessageMode = 'message',
) => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrUpdateApiAuthority, params: params },
    {
      errorMessageMode: mode,
    },
  )
}

/**
 *  author: Ryan Su
 *  @description:
 */

export const CreateOrAddMenuAuthority = (
  params: MenuAuthorityInfo,
  mode: ErrorMessageMode = 'message',
) => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrAddMenuAuthority, params: params },
    {
      errorMessageMode: mode,
    },
  )
}

/**
 *  author: Ryan Su
 *  @description:
 */

export const createOrUpdateMenuAuthority = (
  params: MenuAuthorityInfo,
  mode: ErrorMessageMode = 'message',
) => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrUpdateMenuAuthority, params: params },
    {
      errorMessageMode: mode,
    },
  )
}

/**
 *  author: Ryan Su
 *  @description: get role's menu authorization ids
 */

export const getMenuAuthority = (params: BaseIdReq) => {
  return defHttp.post<BaseDataResp<MenuAuthorityInfo>>({
    url: Api.GetRoleMenuList,
    params,
  })
}
