import { defHttp } from '/@/utils/http/axios';
import {
    GetMemberInfoModel,
    CaptchaResp,
    RegisterReq,
    MemberListReq,
    MemberListResp,
    MemberInfo,
    MemberProfile,
} from './model/memberModel';

import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseResp } from '../model/baseModel';

enum Api {
    Login = '/api/login',
    Register = '/api/member/register',
    Logout = '/api/admin/token',
    GetMemberInfo = '/api/admin/member/info',
    GetPermCode = '/api/admin/member/perm',
    GetCaptcha = '/api/captcha',
    GetMemberList = '/api/admin/member/list',
    CreateOrAddMember = '/api/admin/member/create',
    CreateOrUpdateMember = '/api/admin/member/update',

    SetMemberStatus = '/api/admin/member/status',
    GetProfile = '/api/admin/member/profile',
    ChangePassword = '/api/admin/member/change-password',
}

/**
 * @description: Member register api
 */
export function register(params: RegisterReq, mode: ErrorMessageMode = 'message') {
    return defHttp.post<BaseResp>(
        {
            url: Api.Register,
            params,
        },
        {
            errorMessageMode: mode,
        },
    );
}

/**
 * @description: get captcha api
 */
export function getCaptcha(mode: ErrorMessageMode = 'message') {
    return defHttp.post<BaseDataResp<CaptchaResp>>(
        {
            url: Api.GetCaptcha,
        },
        {
            errorMessageMode: mode,
        },
    );
}

/**
 * @description: getMemberInfo
 */
export function getMemberInfo() {
    return defHttp.get<BaseDataResp<GetMemberInfoModel>>(
        { url: Api.GetMemberInfo },
        { errorMessageMode: 'none' },
    );
}

export function getPermCode() {
    return defHttp.post<BaseDataResp<string[]>>({ url: Api.GetPermCode });
}

export function doLogout() {
    return defHttp.delete({ url: Api.Logout });
}

// member management

/**
 * @description: Get member menu based on api id
 */

export const getMemberList = (params: MemberListReq) => {
    return defHttp.post<BaseDataResp<MemberListResp>>({ url: Api.GetMemberList, params });
};

/**
 *  author: Ryan Su
 *  @description: create a new Member
 */
export const createOrAddMember = (params: MemberInfo, mode: ErrorMessageMode = 'message') => {
    return defHttp.post<BaseResp>(
        { url: Api.CreateOrAddMember, params: params },
        {
            errorMessageMode: mode,
        },
    );
};

/**
 *  author: Ryan Su
 *  @description: create a new member
 */
export const createOrUpdateMember = (params: MemberInfo, mode: ErrorMessageMode = 'message') => {
    return defHttp.post<BaseResp>(
        { url: Api.CreateOrUpdateMember, params: params },
        {
            errorMessageMode: mode,
        },
    );
};


/**
 *  author: Ryan Su
 *  @description: set role's status
 */
export const setMemberStatus = (id: number, status: number) =>
    defHttp.post({ url: Api.SetMemberStatus, params: { id, status } });

/**
 *  author: Ryan Su
 *  @description: Get Member profile
 */
export function getMemberProfile() {
    return defHttp.get<BaseDataResp<MemberProfile>>(
        { url: Api.GetProfile },
        { errorMessageMode: 'message' },
    );
}

/**
 *  author: Ryan Su
 *  @description: update Member profile
 */
export function updateProfile(params: MemberProfile) {
    return defHttp.post<BaseResp>({ url: Api.GetProfile, params }, { errorMessageMode: 'message' });
}
