import { request } from '@/utils/request/request';

enum Api {
  GetUserMenu = '/api/admin/menu/role',
}

const getUserMenu = () => {
  return request.get(Api.GetUserMenu);
};

export default {
  getUserMenu
};