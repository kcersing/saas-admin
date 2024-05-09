import { request } from '@/utils/request/request';

enum Api {
  ProductList = '/api/admin/product/list',
  SetProductStatus = '/api/admin/product/status',
  CreateOrAddProduct= '/api/admin/product/create',
  CreateOrUpdateProduct = '/api/admin/product/update',

  PropertyList = '/api/admin/property/list',
  SetPropertyStatus = '/api/admin/property/status',
  CreateProperty= '/api/admin/property/create',
  CreateOrUpdateProperty = '/api/admin/property/update',

  GetProductInfo = '/api/admin/product/info',
}


export const productList = (params: object) => request.post(Api.ProductList, params);
export const propertyList = (params: object) => request.post(Api.PropertyList, params);
export const propertyEdit = (params: object) => request.post(Api.CreateOrUpdateProperty, params);

export const propertyCreate = (params: object) => request.post(Api.CreateProperty, params);


export default {
  productList,
  propertyList,
  propertyEdit,
  propertyCreate

};