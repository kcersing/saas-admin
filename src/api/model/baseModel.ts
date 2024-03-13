export interface BasePageReq {
  page: number;
  pageSize: number;
}

export interface BaseListResp<T> {
  data: T[];
  total: number;
}

export interface BaseDataResp<T> {
  code: number;
  message: string;
  total: number;
  data: T;
}

export interface BaseResp {
  code?: number;
  message: string;
}

export interface BaseRespStr<T> {
  code?: number;
  message: string;
  protoStr: T;
  structStr: T;
}

export interface BaseIdReq {
  id: number;
}

export interface BaseIdsReq {
  ids: number[];
}
