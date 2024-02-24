/*
 * @Author: GS\Administrator wt4@live.cn
 * @Date: 2024-02-22 10:24:15
 * @LastEditors: GS\Administrator wt4@live.cn
 * @LastEditTime: 2024-02-24 12:04:44
 * @FilePath: \vben-admin\src\enums\pageEnum.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export enum PageEnum {
  // basic login path
  BASE_LOGIN = '/login',
  // basic home path
  BASE_HOME = '/dashboard/workbench/index',
  // error page path
  ERROR_PAGE = '/exception',
  // error log page path
  ERROR_LOG_PAGE = '/error-log/list',
  // oauth callback page
  OAUTH_CALLBACK = '/base/oauth/callback',
}
