import { request } from '@/utils/request/request';


enum Api {
  RoleList = '/api/admin/role/list',
  CreateOrAddRole = '/api/admin/role/create',
  CreateOrUpdateRole = '/api/admin/role/update',
  DeleteRole = '/api/admin/role',
  SetRoleStatus = '/api/admin/role/status',
}

export const roleList = () => request.get(Api.RoleList);

export default {
  roleList,
};