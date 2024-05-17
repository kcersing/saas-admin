import { request } from '@/utils/request/request';


enum Api {
  // PropertyType='/api/admin/dict/detail/list',
  // VenueList = '/api/admin/venue/list',


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


}

// 属性类型
export const propertyType = () => request.post(Api.PropertyType, { 'dictionaryId': 1 });

// 员工列表
export const staffList = () => request.post(Api.StaffList);

// 合同列表
export const contractList = () => request.post(Api.ContractList);

// 场馆列表
export const memberList = () => request.post(Api.MemberList);

// 属性列表
export const propertyList = () => request.post(Api.PropertyList);

// 商品列表
export const productList = () => request.post(Api.ProductList);
// 场馆列表
export const venueList = () => request.post(Api.VenueList);





export default {
  propertyType,
  venueList,
  staffList,
  propertyList,
  productList,
  memberList,
  contractList,
};