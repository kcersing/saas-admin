import { defHttp } from '/@/utils/http/axios';


import { BaseDataResp } from '../model/baseModel';

import {
     getSearchVenueParams, VenueListResp,
} from './model/universalModel';


enum Api {
    GetAllVenue = "/api/admin/venue/list"

}
export const getAllVenue = (params?: getSearchVenueParams) => {
    return defHttp.post<BaseDataResp<VenueListResp>>({ url: Api.GetAllVenue, params });
};