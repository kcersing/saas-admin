import { request } from '@/utils/request/request';
import { LoginData } from '@/api/user';


enum Api {
  MemberLogin = '/api/member/login',
  MemberInfo = '/api/admin/member/info',
  MemberList = '/api/admin/member/list',
  MemberUpdate = ' /api/admin/member/update',
  MemberCreate = '/api/admin/member/create',

}

export const memberLogin = (params: LoginData) => request.post(Api.MemberLogin, params);

export const memberInfo = (params: object) => request.post(Api.MemberInfo, params);

export const memberList = (params: object) => request.post(Api.MemberList, params);

export const memberUpdate = (params: object) => request.post(Api.MemberUpdate, params);

export const memberCreate = (params: object) => request.post(Api.MemberCreate, params);

export default {
  memberLogin,
  memberInfo,
  memberList,
  memberUpdate,
  memberCreate
};
