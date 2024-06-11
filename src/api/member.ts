import { request } from '@/utils/request/request';
import { LoginData } from '@/api/user';


enum Api {
  MemberLogin = '/api/member/login',
  MemberInfo = '/api/admin/member/info',
  MemberList = '/api/admin/member/list',
  MemberUpdate = ' /api/admin/member/update',
  MemberCreate = '/api/admin/member/create',

  Logout = '/api/member/token',

  MemberStatus = '/api/admin/member/status',

  ChangePassword = '/api/admin/member/change-password',
  GetPermCode = '/api/admin/member/perm',

  MemberSearch = '/api/admin/member/search'


}

export const memberLogin = (params: LoginData) => request.post(Api.MemberLogin, params);

export const memberInfo = (params: object) => request.post(Api.MemberInfo, params);

export const memberList = (params: object) => request.post(Api.MemberList, params);

export const memberUpdate = (params: object) => request.post(Api.MemberUpdate, params);

export const memberCreate = (params: object) => request.post(Api.MemberCreate, params);

export const memberStatus = (params: object) => request.post(Api.MemberStatus, params);

export const memberSearch = (params: object) => request.post(Api.MemberSearch, params);

export default {
  memberLogin,
  memberInfo,
  memberList,
  memberUpdate,
  memberCreate,
  memberStatus,
  memberSearch
};
