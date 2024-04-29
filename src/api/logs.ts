
import { request } from '@/utils/request/request';
enum Api {
  GetLogsList = '/api/admin/logs/list',
  DeleteLogs = '/api/admin/logs/deleteAll',
}
export const getLogsList = (params: object) => request.post(Api.GetLogsList,params);

export const deleteLogs = (params: object) => request.post(Api.DeleteLogs,params);

export default {
  getLogsList,
  deleteLogs,
};
