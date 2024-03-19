import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { formatToDateTime } from '/@/utils/dateUtil';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { useMessage } from '/@/hooks/web/useMessage';
import { setPropertyStatus } from '/@/api/sys/product';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('类型'),
    dataIndex: 'type',
    width: 30,
  },
  {
    title: t('属性名'),
    dataIndex: 'name',
    width: 30,
  },
  {
    title: t('总时长'),
    dataIndex: 'duration',
    width: 30,
  },
  {
    title: t('次数'),
    dataIndex: 'count',
    width: 30,
  },
  {
    title: t('单次时长'),
    dataIndex: 'length',
    width: 30,
  },
  {
    title: t('定价'),
    dataIndex: 'price',
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
          setPropertyStatus(record.id, newStatus)
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
    field: 'type',
    label: t('类别'),
    component: 'Select',
    colProps: { span: 8 },
    componentProps: {
      // search form does not support updateSchema function yet
      // therefore we have to manually set the options
      options: [
        { label: t('common.all'), value: 0 },
        { label: t('卡'), value: 1 },
        { label: t('私教课'), value: 2 },
        { label: t('团课'), value: 3 },
      ],
    },
  },
  {
    field: 'name',
    label: t('属性名'),
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 30 }],
  },
  {
    field: 'venue',
    label: t('使用场馆'),
    component: 'ApiSelect',
    colProps: { span: 8 },
    // rules: [{ max: 30 }],
  },
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
    field: 'id',
    label: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'type',
    label: t('类别'),
    component: 'Select',
    colProps: { span: 8 },
    componentProps: {
      // search form does not support updateSchema function yet
      // therefore we have to manually set the options
      options: [
        { label: t('卡'), value: 1 },
        { label: t('私教课'), value: 2 },
        { label: t('团课'), value: 3 },
      ],
    },
  },
  {
    field: 'name',
    label: t('产品'),
    required: true,
    component: 'Input',
    rules: [{ max: 30 }],
  },
  {
    field: 'price',
    label: t('定价'),
    required: true,
    component: 'InputNumber',
    // rules: [{ max: 30 }],
  },
  {
    field: 'count',
    label: t('次数'),
    required: true,
    component: 'InputNumber',
    // rules: [{ max: 30 }],
  },
  {
    field: 'length',
    label: t('单次时长'),
    required: true,
    component: 'InputNumber',
    // rules: [{ max: 30 }],
  },
  {
    field: 'duration',
    label: t('总时长'),
    required: true,
    component: 'InputNumber',
    // rules: [{ max: 30 }],
  },
  {
    field: 'venue',
    label: t('使用场馆'),
    component: 'ApiSelect',
    colProps: { span: 8 },
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
