import { request } from '@/utils/request/request';
import { getImgCaptcha } from '@/api/captcha';


enum Api {
  DictionaryList = '/api/admin/dict/list',
  CreateOrAddDictionary = '/api/admin/dict/create',
  CreateOrUpdateDictionary = '/api/admin/dict/update',
  DeleteDictionary = '/api/admin/dict',

  DictionaryDetailList = '/api/admin/dict/detail/list',
  CreateOrAddDetailDictionary = '/api/admin/dict/detail/create',
  CreateOrUpdateDictionaryDetail = '/api/admin/dict/detail/update',
  DeleteDictionaryDetail = '/api/admin/dict/detail',
}

export const dictionaryList = (params: object) => request.post(Api.DictionaryList, params);
export const dictionaryDetailList = (params: object) => request.post(Api.DictionaryDetailList, params);
export default {
  dictionaryList,
  dictionaryDetailList,
};