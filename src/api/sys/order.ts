import { defHttp } from '/@/utils/http/axios';
import {OrderInfo, OrderListReq, OrderListResp} from './model/orderModel';

import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseResp } from '../model/baseModel';

enum Api {
    OrderList = '/api/admin/order/list',
    SetOrderStatus = '/api/admin/order/status',
    CreateOrAddOrder= '/api/admin/order/create',
    CreateOrUpdateOrder = '/api/admin/order/update',

    GetOrderInfo = '/api/admin/order/info',

}
export const getOrderList = (params: OrderListReq) => {
    return defHttp.post<BaseDataResp<OrderListResp>>({ url: Api.OrderList, params });
};

export const setOrderStatus = (id: number, status: number) =>
    defHttp.post({ url: Api.SetOrderStatus, params: { id, status } });

export const createOrAddOrder = (params: OrderInfo, mode: ErrorMessageMode = 'message') => {
    return defHttp.post<BaseResp>(
        { url: Api.CreateOrAddOrder, params: params },
        {
            errorMessageMode: mode,
        },
    );
};
export const createOrUpdateOrder = (params: OrderInfo, mode: ErrorMessageMode = 'message') => {
    return defHttp.post<BaseResp>(
        { url: Api.CreateOrUpdateOrder, params: params },
        {
            errorMessageMode: mode,
        },
    );
};