import type { MenuModule } from '/@/router/types'
import { t } from '/@/hooks/web/useI18n'
const member: MenuModule = {
  orderNo: 10,
  menu: {
    name: t('会员管理'),
    path: '/member',

    children: [
      {
        path: 'member-list',
        name: t('会员列表'),
      },
    ],
  },
}
export default member
