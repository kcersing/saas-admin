import { request } from '@/utils/request/request';
import { login, userInfo, userList } from '@/api/user';


enum Api {
  PropertyType='/api/admin/dict/detail/list',
  VenueList = '/api/admin/venue/list',
}


export const propertyType = () => request.post(Api.PropertyType,{ "dictionaryId":1, });
export const venueData = () => request.post(Api.VenueList);

export default {
  propertyType,
  venueData,
};