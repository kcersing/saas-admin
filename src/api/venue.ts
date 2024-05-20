import { request } from '@/utils/request/request';


enum Api {

  VenueList = '/api/admin/venue/list',
  VenueCreate = '/api/admin/venue/create',

}


// 员工列表
export const venueList =(params: object) => request.post(Api.VenueList,params);
export const venueCreate = (params: object)=> request.post(Api.VenueCreate,params);

export default {
  venueList,
  venueCreate,
};