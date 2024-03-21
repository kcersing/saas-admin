export interface ProductListReq {
  page: number;
  pageSize: number;
  name: string;
}

export interface ProductListResp {
  total: number;
  data: ProductInfo[];
}
export interface ProductInfo {
  id: number;
  name: string;
  pic: string;
  description: string;
  price: string;
  stock: string;
  status: number;
  propertyId: number[];
  createdAt?: number;
  updatedAt?: number;
}

export interface PropertyInfo {
  id: number;
  name: string;
  price: string;

  duration: number;
  type: string;
  length: number;
  count: number;

  data: string;
  status: number;
  venueId: number[];
  createdAt?: number;
  updatedAt?: number;
}

export interface PropertyListReq {
  page: number;
  pageSize: number;
  name: string;
}

export interface PropertyListResp {
  total: number;
  data: PropertyInfo[];
}


