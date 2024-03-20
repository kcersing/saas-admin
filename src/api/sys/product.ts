import { defHttp } from '/@/utils/http/axios';
import {ProductInfo, ProductListReq, ProductListResp,PropertyInfo,PropertyListReq,PropertyListResp} from './model/productModel';

import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseResp } from '../model/baseModel';

enum Api {
  ProductList = '/api/admin/product/list',
  SetProductStatus = '/api/admin/product/status',
  CreateOrAddProduct= '/api/admin/product/create',
  CreateOrUpdateProduct = '/api/admin/product/update',


  PropertyList = '/api/admin/property/list',
  SetPropertyStatus = '/api/admin/property/status',
  CreateOrAddProperty= '/api/admin/property/create',
  CreateOrUpdateProperty = '/api/admin/property/update',

  GetProductInfo = '/api/admin/product/info',


  // DeleteProduct = '',
}
export const getProductList = (params: ProductListReq) => {
  return defHttp.post<BaseDataResp<ProductListResp>>({ url: Api.ProductList, params });
};
export const setProductStatus = (id: number, status: number) =>
  defHttp.post({ url: Api.SetProductStatus, params: { id, status } });


export const createOrAddProduct = (params: ProductInfo, mode: ErrorMessageMode = 'message') => {
  return defHttp.post<BaseResp>(
      { url: Api.CreateOrAddProduct, params: params },
      {
        errorMessageMode: mode,
      },
  );
};
export const createOrUpdateProduct = (params: ProductInfo, mode: ErrorMessageMode = 'message') => {
  return defHttp.post<BaseResp>(
      { url: Api.CreateOrUpdateProduct, params: params },
      {
        errorMessageMode: mode,
      },
  );
};

export const getPropertyList = (params: PropertyListReq) => {
    return defHttp.post<BaseDataResp<PropertyListResp>>({ url: Api.PropertyList, params });
};
export const setPropertyStatus = (id: number, status: number) =>
    defHttp.post({ url: Api.SetPropertyStatus, params: { id, status } });

export const createOrAddProperty = (params: PropertyInfo, mode: ErrorMessageMode = 'message') => {
    return defHttp.post<BaseResp>(
        { url: Api.CreateOrAddProperty, params: params },
        {
            errorMessageMode: mode,
        },
    );
};
export const createOrUpdateProperty = (params: PropertyInfo, mode: ErrorMessageMode = 'message') => {
    return defHttp.post<BaseResp>(
        { url: Api.CreateOrUpdateProperty, params: params },
        {
            errorMessageMode: mode,
        },
    );
};




// export const deleteProduct = (params: BaseIdReq, mode: ErrorMessageMode = 'message') => {
//   return defHttp.delete<BaseResp>(
//     { url: Api.DeleteProduct, params: params },
//     {
//       errorMessageMode: mode,
//     },
//   );
// };
