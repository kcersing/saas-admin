import { request } from '@/utils/request/request';

enum Api {
  EntryList = '/api/admin/entry/list',
}

export const entryList = (params: object) => request.post(Api.EntryList, params);

export default {
  entryList
};
