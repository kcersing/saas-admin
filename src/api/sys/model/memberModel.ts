
/**
 * @description: Register interface parameters
 */
export interface RegisterReq {
    username: string;
    password: string;
    email: string;
    captcha: string;
    captchaId: string;
}

/**
 * @description: Get user information return value
 */
export interface GetMemberInfoModel {

    id: number;
    // 用户id
    userId: string | number;
    // 用户名
    username: string;
    // 昵称
    nickname: string;
    // 头像
    avatar: string;
    // 介绍
    desc?: string;
}

export interface CaptchaResp {
    id: string;
    imgPath: string;
}

export interface MemberListReq {
    page: number;
    pageSize: number;
    username: string;
    nickname: string;
    email: string;
    mobile: string;
}

export interface CreateOrUpdateMemberReq{
    id: number;
    name: string;
    nickname: string;
    email: string;
    mobile: string;
    avatar: string;
    status: number;
    createdAt?: number;
    updatedAt?: number;
    birthday: string;
    gender: number;
    wecom:string;
}
export interface MemberInfo {
    id: number;
    name: string;
    nickname: string;
    email: string;
    mobile: string;
    avatar: string;
    status: number;
    createdAt?: number;
    updatedAt?: number;
    birthday: string;
    gender: number;
    wecom:string;

}

export interface MemberListResp {
    total: number;
    data: MemberInfo[];
}

export interface MemberProfile {
    avatar: string;
    nickname: string;
    email: string;
    mobile: string;
}
