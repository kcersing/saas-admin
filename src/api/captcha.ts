import { request } from '@/utils/request/request'

export enum Api {
 Captcha = '/api/captcha',
}

export const getImgCaptcha = () =>  request.post(Api.Captcha);

export default {
 getImgCaptcha
};