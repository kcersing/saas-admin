import { request } from '@/utils/request/request';
enum Api {
  OrderList = '/api/admin/order/list',
  SetOrderStatus = '/api/admin/order/status',
  CreateOrder= '/api/admin/order/create',
  UpdateOrder = '/api/admin/order/update',

  GetOrderInfo = '/api/admin/order/info',
}
export const orderList = (params: object) => request.post(Api.OrderList, params);
export const orderCreate = (params: object) => request.post(Api.CreateOrder, params);
export const orderUpdate = (params: object) => request.post(Api.UpdateOrder, params);
export const orderSetStatus = (params: object) => request.post(Api.SetOrderStatus, params);
export const orderGetInfo = (params: object) => request.post(Api.GetOrderInfo, params);
export default {
  orderList,
  orderCreate,
  orderUpdate,
  orderGetInfo,
  orderSetStatus,
};