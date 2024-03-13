/*
 * @Author: GS\Administrator wt4@live.cn
 * @Date: 2024-03-13 13:51:47
 * @LastEditors: GS\Administrator wt4@live.cn
 * @LastEditTime: 2024-03-13 18:49:01
 * @FilePath: \vben-admin\build\vite\proxy.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * Used to parse the .env.development proxy configuration
 */
import type { ProxyOptions } from 'vite';

type ProxyItem = [string, string];

type ProxyList = ProxyItem[];

type ProxyTargetList = Record<string, ProxyOptions>;

const httpsRE = /^https:\/\//;

// /**
//  * Generate proxy  本地
//  * @param list
//  */
export function createProxy(list: ProxyList = []) {
  const ret: ProxyTargetList = {};
  for (const [prefix, target] of list) {
    const isHttps = httpsRE.test(target);

    // https://github.com/http-party/node-http-proxy#options
    ret[prefix] = {
      target: target,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
      // https is require secure=false
      ...(isHttps ? { secure: false } : {}),
    };
  }
  return ret;
}

/**
 * Generate proxy 正式
 * @param list
 */
// export function createProxy(list: ProxyList = []) {
//   const ret: ProxyTargetList = {};
//   for (const [prefix, target] of list) {
//     console.log('222',target)
//     const isHttps = httpsRE.test(prefix);

//     // https://github.com/http-party/node-http-proxy#options
//     ret[prefix] = {
//       target: prefix,
//       changeOrigin: true,
//       ws: true,
//       // rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
//       // https is require secure=false
//       ...(isHttps ? { secure: false } : {}),
//     };
//   }
//   return ret;
// }
