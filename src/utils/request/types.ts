//axios返回格式
export interface axiosTypes<T> {
  data: T;
  status: number;
  statusText: string;
}

export interface responseTypes<T> {
  code: number | string,
  message: string,
  data: T,
}
