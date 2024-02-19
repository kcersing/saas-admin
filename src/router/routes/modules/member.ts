import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'

const member: AppRouteModule = {
  path: '/member',
  name: 'Member',
  component: LAYOUT,
  redirect: '/member/list',
  meta: {
    icon: 'ion:grid-outline',
    title: t('会员管理'),
  },
  children: [
    {
      path: 'list',
      name: 'List',
      component: () => import('/@/views/dashboard/analysis/index.vue'),
      meta: {
        affix: true,
        title: t('会员列表'),
      },
    },
  ],
}
export default member
