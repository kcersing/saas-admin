import { request } from '@/utils/request/request';


enum Api {

  VenueList = '/api/admin/venue/list',
  VenueCreate = '/api/admin/venue/create',
  VenueStatus = '/api/admin/venue/status',
  VenueUpdate = '/api/admin/venue/update',
  PlaceCreate = '/api/admin/place/create',
  PlaceList= '/api/admin/place/list',
  PlaceStatus = '/api/admin/place/status',
  PlaceUpdate = '/api/admin/place/update',
}


// 员工列表
export const venueList =(params: object) => request.post(Api.VenueList,params);
export const venueCreate = (params: object)=> request.post(Api.VenueCreate,params);
export const venueStatus =(params: object) => request.post(Api.VenueStatus,params);
export const venueUpdate =(params: object) => request.post(Api.VenueUpdate,params);
export const placeList =(params: object) => request.post(Api.PlaceList,params);
export const placeCreate = (params: object)=> request.post(Api.PlaceCreate,params);
export const placeStatus =(params: object) => request.post(Api.PlaceStatus,params);
export const placeUpdate =(params: object) => request.post(Api.PlaceUpdate,params);
export default {
  venueList,
  venueCreate,
  venueStatus,
  venueUpdate,
  placeList,
  placeCreate,
  placeStatus,
  placeUpdate,
};