export interface BasicPageParams {
  page: number
  pageSize: number
}

export interface BasicFetchResult<T> {
  items: T[]
  total: number
}

export interface BaseDataResp<T> {
  code: number
  message: string
  data: T
}

export interface BaseResp {
  code: number
  message: string
}

export interface BaseRespStr<T> {
  code: number
  message: string
  protoStr: T
  structStr: T
}

export interface BaseIdReq {
  ID: number
}

export interface BaseIdsReq {
  ids: number[]
}
