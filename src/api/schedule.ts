import { request } from '@/utils/request/request';


enum Api {
  ScheduleCreate = '/api/admin/schedule/create',
  ScheduleInfo  = '/api/admin/schedule/info',
  ScheduleList = '/api/admin/schedule/list',
  ScheduleDateList = '/api/admin/schedule/date-list',
  ScheduleStatus = '/api/admin/schedule/status',
  ScheduleUpdate= '/api/admin/schedule/update',
  ScheduleMemberList = '/api/admin/schedule/schedule-member-list',
  SearchSubscribeByName = '/api/admin/schedule/search-subscribe-by-member',
  ScheduleMemberSubscribe = '/api/admin/schedule/member-subscribe',

  ScheduleMemberStatus = '/api/admin/schedule/schedule-member-status',

  ScheduleCoachList = '/api/admin/schedule/schedule-coach-list',

  SetScheduleCoachState ='/api/admin/schedule/schedule-coach-status',
}

export const scheduleCreate = (params: object) => request.post(Api.ScheduleCreate, params);
export const scheduleList = (params: object) => request.post(Api.ScheduleList, params);
export const scheduleDateList = (params: object) => request.post(Api.ScheduleDateList, params);
export const scheduleInfo = (params: object) => request.get(Api.ScheduleInfo, params);
export const scheduleStatus = (params: object) => request.post(Api.ScheduleStatus, params);
export const scheduleUpdate = (params: object) => request.post(Api.ScheduleUpdate, params);
export const getScheduleMemberList = (params: object) => request.post(Api.ScheduleMemberList, params);
export const searchSubscribeByName = (params: object) => request.post(Api.SearchSubscribeByName,params);
export const scheduleMemberSubscribe = (params: object) => request.post(Api.ScheduleMemberSubscribe,params);
export const scheduleMemberStatus = (params: object) => request.post(Api.ScheduleMemberStatus, params);
export const scheduleCoachList = (params: object) => request.post(Api.ScheduleCoachList, params);
export const setScheduleCoachState = (params: object) => request.post(Api.SetScheduleCoachState, params);
export default {
  scheduleCreate,
  scheduleList,
  scheduleInfo,
  scheduleStatus,
  scheduleUpdate,
  scheduleDateList,
  getScheduleMemberList,
  searchSubscribeByName,
  scheduleMemberSubscribe,
  scheduleMemberStatus,
  scheduleCoachList,
  setScheduleCoachState
};