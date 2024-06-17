import { request } from '@/utils/request/request';


enum Api {
  // 商品列表
  ProductList = '/api/sys/product/list',
  // 属性列表
  PropertyList = '/api/sys/property/list',
  // 属性类型
  PropertyType = '/api/sys/property/type',
  // 场馆列表
  VenueList = '/api/sys/venue/list',
  // 会员列表
  MemberList = '/api/sys/member/list',
  // 合同列表
  ContractList = '/api/sys/contract/list',
  // 员工列表
  StaffList = '/api/sys/staff/list',
  // 场地列表
  PlaceList= '/api/sys/place/list',
}

// 属性类型
export const propertyType = () => request.post(Api.PropertyType, { 'dictionaryId': 1 });
// 员工列表
export const staffList = (params: object) => request.post(Api.StaffList,params);
// 合同列表
export const contractList = (params: object) => request.post(Api.ContractList,params);
// 场馆列表
export const memberList = (params: object) => request.post(Api.MemberList,params);
// 属性列表
export const propertyList = (params: object) => request.post(Api.PropertyList, params);
// 商品列表
export const productList = (params: object) => request.post(Api.ProductList,params);
// 场馆列表
export const venueList = (params: object) => request.post(Api.VenueList,params);
export const natureType = () => request.post(Api.PropertyType, { 'dictionaryId': 4 });
export const placeList = (params: object) => request.post(Api.PlaceList,params);


export default {
  propertyType,
  venueList,
  staffList,
  propertyList,
  productList,
  memberList,
  contractList,
  natureType,
  placeList,
};