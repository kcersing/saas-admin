import { request } from '@/utils/request/request';


enum Api {
  ScheduleCreate = '/api/admin/schedule/create',
  ScheduleInfo  = '/api/admin/schedule/info',
  ScheduleList = '/api/admin/schedule/list',
  ScheduleDateList = '/api/admin/schedule/date-list',
  ScheduleStatus = '/api/admin/schedule/status',
  ScheduleUpdate= '/api/admin/schedule/update',
}

export const scheduleCreate = (params: object) => request.post(Api.ScheduleCreate, params);
export const scheduleList = (params: object) => request.post(Api.ScheduleList, params);
export const scheduleDateList = (params: object) => request.post(Api.ScheduleDateList, params);
export const scheduleInfo = (params: object) => request.get(Api.ScheduleInfo, params);
export const scheduleStatus = (params: object) => request.post(Api.ScheduleStatus, params);
export const scheduleUpdate = (params: object) => request.post(Api.ScheduleUpdate, params);

export default {
  scheduleCreate,
  scheduleList,
  scheduleInfo,
  scheduleStatus,
  scheduleUpdate,
  scheduleDateList,
};