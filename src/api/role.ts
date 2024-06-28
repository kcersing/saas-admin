import { request } from '@/utils/request/request';


enum Api {
  RoleList = '/api/admin/role/list',
  CreateOrAddRole = '/api/admin/role/create',
  CreateOrUpdateRole = '/api/admin/role/update',
  DeleteRole = '/api/admin/role',
  SetRoleStatus = '/api/admin/role/status',

  ApiList = '/api/admin/api/list',
}

export const roleList = () => request.get(Api.RoleList);

export const apiList = (params: object) => request.get(Api.ApiList, params);


export default {
  roleList,
  apiList,
};