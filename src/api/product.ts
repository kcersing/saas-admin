import { request } from '@/utils/request/request';

enum Api {
  ProductList = '/api/admin/product/list',
  SetProductStatus = '/api/admin/product/status',
  CreateProduct= '/api/admin/product/create',
  UpdateProduct = '/api/admin/product/update',

  PropertyList = '/api/admin/property/list',
  SetPropertyStatus = '/api/admin/property/status',
  CreateProperty= '/api/admin/property/create',
  UpdateProperty = '/api/admin/property/update',

  GetProductInfo = '/api/admin/product/info',
}


export const productList = (params: object) => request.post(Api.ProductList, params);
export const productCreate = (params: object) => request.post(Api.CreateProduct, params);
export const productEdit = (params: object) => request.post(Api.UpdateProduct, params);
export const productSetStatus = (params: object) => request.post(Api.SetProductStatus, params);


export const propertyList = (params: object) => request.post(Api.PropertyList, params);
export const propertyCreate = (params: object) => request.post(Api.CreateProperty, params);
export const propertyEdit = (params: object) => request.post(Api.UpdateProperty, params);
export const propertySetStatus = (params: object) => request.post(Api.SetPropertyStatus, params);


export default {
  productList,
  productCreate,
  productEdit,
  productSetStatus,

  propertyList,
  propertyEdit,
  propertyCreate,
  propertySetStatus,

};