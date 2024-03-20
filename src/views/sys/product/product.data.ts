import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { formatToDateTime } from '/@/utils/dateUtil';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { useMessage } from '/@/hooks/web/useMessage';
import { setProductStatus } from '/@/api/sys/product';
import { RoleInfo } from '/@/api/sys/model/roleModel';
import {getAllVenue} from "/@/api/sys/universal";

const { t } = useI18n();
interface compOption {
  label: string;
  value: string | number;
}

// get role options data
export const roleOptionData = (roleInfoInStore: RoleInfo[], type: number): compOption[] => {
  const result: compOption[] = [];
  // type 1 means search schema
  if (type === 1) {
    result.push({ label: '全部', value: 0 });
  }
  for (let i = 0; i < roleInfoInStore.length; i++) {
    result.push({
      label: roleInfoInStore[i].remark,
      value: roleInfoInStore[i].id,
    });
  }
  return result;
};

export const columns: BasicColumn[] = [
  {
    title: t('产品名'),
    dataIndex: 'name',
    width: 30,
  },
  {
    title: t('价格'),
    dataIndex: 'price',
    width: 30,
  },
  {
    title: t('库存'),
    dataIndex: 'stock',
    width: 30,
  },
  {
    title: t('common.statusName'),
    dataIndex: 'status',
    width: 20,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status === 1,
        checkedChildren: t('common.on'),
        unCheckedChildren: t('common.off'),
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ? 1 : 0;
          const { createMessage } = useMessage();
          setProductStatus(record.id, newStatus)
            .then(() => {
              record.status = newStatus;
              createMessage.success(t('common.changeStatusSuccess'));
            })
            .catch(() => {
              createMessage.error(t('common.changeStatusFailed'));
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
  {
    title: t('common.createTime'),
    dataIndex: 'createdAt',
    width: 50,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: t('产品名'),
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 30 }],
  },
  {
    field: 'propertyName',
    label: t('属性名'),
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 30 }],
  },
  // {
  //   field: 'roleID',
  //   label: t('sys.role.roleTitle'),
  //   component: 'Select',
  //   colProps: { span: 8 },
  //   componentProps: {
  //     // search form does not support updateSchema function yet
  //     // therefore we have to manually set the options
  //     options: [
  //       { label: t('common.all'), value: 0 },
  //       { label: t('卡'), value: 1 },
  //       { label: t('私教课'), value: 2 },
  //       { label: t('团课'), value: 3 },
  //     ],
  //   },
  // },
  // {
  //   field: 'mobile',
  //   label: t('sys.login.mobile'),
  //   component: 'Input',
  //   colProps: { span: 8 },
  //   rules: [{ max: 18 }],
  // },
  // {
  //   field: 'email',
  //   label: t('sys.login.email'),
  //   component: 'Input',
  //   colProps: { span: 8 },
  //   rules: [{ type: 'email' }],
  // },
];
export const formSchema: FormSchema[] = [
  {
    field: 'pic',
    label: t('图片'),
    defaultValue: '',
    component: 'Input',
    show: false,
  },
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: t('产品名'),
    required: true,
    component: 'Input',
    rules: [{ max: 30 }],
  },

  {
    field: 'name',
    label: t('产品名'),
    required: true,
    component: 'Input',
    rules: [{ max: 30 }],
  },
    
  // {
  //   field: 'venue',
  //   component: 'ApiSelect',
  //   label: '场馆',
  //   required: true,
  //   componentProps: {
  //     api: getAllVenue,
  //     params: {
  //       // name: 1,
  //     },
  //     resultField: 'data',
  //     // use name as label
  //     labelField: 'name',
  //     // use id as value
  //     valueField: 'id',
  //     // not request untill to select
  //     immediate: true,
  //     onChange: (e, v) => {
  //       console.log('ApiSelect====>:', e, v);
  //     },
  //     // atfer request callback
  //     onOptionsChange: (options) => {
  //       console.log('get options', options.length, options);
  //     },
  //   },
  // },
  {
    field: 'price',
    label: t('价格'),
    required: true,
    component: 'InputNumber',
    // rules: [{ max: 30 }],
  },
  {
    field: 'stock',
    label: t('库存'),
    required: true,
    component: 'InputNumber',
    // rules: [{ max: 30 }],
  },

  {
    field: 'status',
    label: t('sys.menu.statusName'),
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: t('common.on'), value: 1 },
        { label: t('common.off'), value: 0 },
      ],
    },
  },
];
