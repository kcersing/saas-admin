import { request } from '@/utils/request/request';
enum Api {
  OrderList = '/api/admin/order/list',
  SetOrderStatus = '/api/admin/order/status',
  CreateOrder= '/api/admin/order/create',
  UpdateOrder = '/api/admin/order/update',
  GetOrderInfo = '/api/admin/order/info',
  OrderPay = '/api/admin/order/unifyPay',
  QRPay = '/api/admin/order/QRPay',
}
export const orderList = (params: object) => request.post(Api.OrderList, params);
export const orderCreate = (params: object) => request.post(Api.CreateOrder, params);
export const orderUpdate = (params: object) => request.post(Api.UpdateOrder, params);
export const orderSetStatus = (params: object) => request.post(Api.SetOrderStatus, params);
export const orderGetInfo = (params: object) => request.post(Api.GetOrderInfo, params);
export const orderPay= (params: object) => request.post(Api.OrderPay, params);
export const orderQRPay= (params: object) => request.post(Api.QRPay, params);


export default {
  orderList,
  orderCreate,
  orderUpdate,
  orderGetInfo,
  orderSetStatus,
  orderPay,
  orderQRPay
};