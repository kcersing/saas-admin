import { request } from '@/utils/request/request';
enum Api {
  OrderList = '/api/admin/order/list',
  SetOrderStatus = '/api/admin/order/status',
  CreateOrAddOrder= '/api/admin/order/create',
  CreateOrUpdateOrder = '/api/admin/order/update',

  GetOrderInfo = '/api/admin/order/info',
}
export const orderList = (params: object) => request.post(Api.OrderList, params);

export default {
  orderList,
};