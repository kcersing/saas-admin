/*
 * @Author: GS\Administrator wt4@live.cn
 * @Date: 2024-02-19 10:40:50
 * @LastEditors: GS\Administrator wt4@live.cn
 * @LastEditTime: 2024-02-19 14:21:04
 * @FilePath: \vben-admin\src\router\routes\modules\product.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'

const product: AppRouteModule = {
  path: '/product',
  name: 'Product',
  component: LAYOUT,
  redirect: '/product/list',
  meta: {
    icon: 'ion:grid-outline',
    title: t('产品管理'),
  },
  children: [
    {
      path: 'list',
      name: 'List',
      component: () => import('/@/views/dashboard/analysis/index.vue'),
      meta: {
        affix: true,
        title: t('产品列表'),
      },
    },
  ],
}
export default product
