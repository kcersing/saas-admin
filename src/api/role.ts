import { request } from '@/utils/request/request';


enum Api {
  RoleList = '/api/admin/role/list',
  CreateOrAddRole = '/api/admin/role/create',
  CreateOrUpdateRole = '/api/admin/role/update',
  DeleteRole = '/api/admin/role',
  SetRoleStatus = '/api/admin/role/status',

  ApiList = '/api/admin/api/list',
  ApiTree = '/api/admin/api/tree',
  SetRoleApi='/api/admin/authority/api/update',
}
export const createRole = () => request.post(Api.CreateOrAddRole);
export const updateRole = (params: object) => request.post(Api.CreateOrUpdateRole, params);
export const deleteRole = (params: object) => request.post(Api.DeleteRole, params);
export const setRoleStatus = (params: object) => request.post(Api.SetRoleStatus, params);
export const roleList = () => request.get(Api.RoleList);
export const apiList = (params: object) => request.post(Api.ApiList, params);
export const apiTree = (params: object) => request.post(Api.ApiTree, params);
export const setRoleApi = (params: object) => request.post(Api.SetRoleApi, params);

export default {
  roleList,
  apiList,
  apiTree,
  setRoleApi,
  createRole,
  updateRole,
  setRoleStatus,
  deleteRole
};