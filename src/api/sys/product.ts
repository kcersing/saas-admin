import { defHttp } from '/@/utils/http/axios';
import { ProductListReq, ProductListResp } from './model/productModel';

import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseIdReq, BaseResp } from '../model/baseModel';

enum Api {
  ProductList = '/api/admin/product/list',
  SetProductStatus = '/api/admin/user/status',
  // DeleteProduct = '',
}
export const getProductList = (params: ProductListReq) => {
  return defHttp.post<BaseDataResp<ProductListResp>>({ url: Api.ProductList, params });
};
export const setProductStatus = (id: number, status: number) =>
  defHttp.post({ url: Api.SetProductStatus, params: { id, status } });
// export const deleteProduct = (params: BaseIdReq, mode: ErrorMessageMode = 'message') => {
//   return defHttp.delete<BaseResp>(
//     { url: Api.DeleteProduct, params: params },
//     {
//       errorMessageMode: mode,
//     },
//   );
// };
