export interface OrderListReq {
    page: number;
    pageSize: number;
    name: string;
}

export interface OrderListResp {
    total: number;
    data: OrderInfo[];
}
export interface OrderInfo {
    id: number;
    sn: string;
    status: number;
    venueId: number;
    createdAt?: number;
    updatedAt?: number;
}


