// import React, { useEffect, useRef, useState } from 'react';
import { request } from 'utils/request'

//登录
 export const GetImgCaptcha = () => request.post('/api/captcha');

// export function  GetImgCaptcha(){

//   return request.post('/api/captcha').then((res) => {
 
//       // console.log(res)
//       return res
//     }).catch(err => {
//       //登录失败。处理区域...
//     });
// }


// export const GetImgCaptcha = () => {
  // return  request.post('/api/captcha').then((res) => { return
  //   console.log(res);
  //  return res.data;
  // })}
