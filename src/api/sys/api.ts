/*
 * @Author: GS\Administrator wt4@live.cn
 * @Date: 2024-02-27 11:43:40
 * @LastEditors: GS\Administrator wt4@live.cn
 * @LastEditTime: 2024-02-27 11:43:44
 * @FilePath: \vben-admin\src\api\sys\api.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defHttp } from '/@/utils/http/axios'
import { ErrorMessageMode } from '/#/axios'
import { BaseDataResp, BaseIdReq, BasePageReq, BaseResp } from '/@/api/model/baseModel'
import { ApiInfo, ApiListResp } from './model/apiModel'

enum Api {
  GetApiList = '/api/admin/api/list',
  CreateOrAddApi = '/api/admin/api/create',
  CreateOrUpdateApi = '/api/admin/api/update',
  DeleteApi = '/api/admin/api',
}

/**
 * @description: Get api list
 */

export const getApiList = (params: BasePageReq) => {
  return defHttp.get<BaseDataResp<ApiListResp>>({ url: Api.GetApiList, params })
}

/**
 *  author: ryan
 *  @description: create a new api
 */
export const createOrAddApi = (params: ApiInfo, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrAddApi, params: params },
    {
      errorMessageMode: mode,
    },
  )
}

/**
 *  author: ryan
 *  @description: create a new api
 */
export const createOrUpdateApi = (params: ApiInfo, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrUpdateApi, params: params },
    {
      errorMessageMode: mode,
    },
  )
}

/**
 *  author: Ryan Su
 *  @description: delete api
 */
export const deleteApi = (params: BaseIdReq, mode: ErrorMessageMode = 'modal') => {
  return defHttp.delete<BaseResp>(
    { url: Api.DeleteApi, params: params },
    {
      errorMessageMode: mode,
    },
  )
}
