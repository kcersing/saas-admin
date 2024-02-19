import type { MenuModule } from '/@/router/types'
import { t } from '/@/hooks/web/useI18n'
const product: MenuModule = {
  orderNo: 10,
  menu: {
    name: t('产品管理'),
    path: '/product',

    children: [
      {
        path: 'product-list',
        name: t('产品列表'),
      },
    ],
  },
}
export default product
