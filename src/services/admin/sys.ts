import { request } from '@umijs/max';
import { BaseDataResp,Sys } from './typings.d';

enum Apis {
  ImgCaptcha = '/api/captcha',
}

/** 图片验证码 POST /api/captcha */
export async function getImgCaptcha(

  options?: { [key: string]: any },
) {
  return request<BaseDataResp<Sys.ImgCaptchaResponse>>(Apis.ImgCaptcha, {
    method: 'POST',
    params: { },
    ...(options || {}),
  });
}
