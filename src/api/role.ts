import { request } from '@/utils/request/request';


enum Api {
  RoleList = '/api/admin/role/list',
  CreateOrAddRole = '/api/admin/role/create',
  CreateOrUpdateRole = '/api/admin/role/update',
  DeleteRole = '/api/admin/role',
  SetRoleStatus = '/api/admin/role/status',
}

export const roleList = (params: object) => request.post(Api.RoleList, params);

export default {
  roleList,
};