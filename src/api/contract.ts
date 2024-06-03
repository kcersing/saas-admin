
import { request } from '@/utils/request/request';
enum Api {
  ContractList = '/api/admin/contract/list',
  ContractCreate='/api/admin/contract/create',
  ContractUpdate= '/api/admin/contract/update',
  ContractUpdateStatus= '/api/admin/contract/status',
  ContractByID= '/api/admin/contract',
}


export const  contractList = (params: object) => request.post(Api.ContractList,params);
export const  contractCreate = (params: object) => request.post(Api.ContractCreate,params);
export const  contractUpdate = (params: object) => request.post(Api.ContractUpdate,params);

export const  contractUpdateStatus = (params: object) => request.post(Api.ContractUpdateStatus,params);
export const  contractByID = (params: object) => request.post(Api.ContractByID,params);
export default {
  contractList,
  contractCreate,
  contractUpdate,
  contractUpdateStatus,
  contractByID,

};
