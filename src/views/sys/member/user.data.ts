import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { formatToDateTime } from '/@/utils/dateUtil';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { useMessage } from '/@/hooks/web/useMessage';
import { setUserStatus } from '/@/api/sys/user';
import {uploadApi} from "/@/api/sys/upload";

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: '姓名',
    dataIndex: 'name',
    width: 30,
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
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
          setUserStatus(record.id, newStatus)
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
    label: '姓名',
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 30 }],
  },
  {
    field: 'mobile',
    label: t('sys.login.mobile'),
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 18 }],
  },

];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: '姓名',
    required: true,
    component: 'Input',
    rules: [{ max: 30 }],
    colProps: {
      span: 24,
    },
  },
  {
    field: 'nickname',
    label: '昵称',
    required: false,
    component: 'Input',
    rules: [{ max: 30 }],
    colProps: {
      span: 24,
    },
  },
  {
    field: 'mobile',
    required: true,
    label: t('sys.login.mobile'),
    component: 'Input',
    rules: [{ max: 18 }],
    colProps: {
      span: 24,
    },
  },
  {
    field: 'wecom',
    required: false,
    label: '微信号',
    component: 'Input',
    rules: [{ max: 18 }],
    colProps: {
      span: 24,
    },
  },
  {
    field: 'gender',
    component: 'RadioGroup',
    label: '性别',
    componentProps: {
      options: [
        {
          label: '男性',
          value: 1,
        },
        {
          label: '女性',
          value: 0,
        },
        {
          label: '保密',
          value: 3,
        },
      ],
    },
    defaultValue: 3,
    colProps: {
      span: 24,
    },
  },
  // {
  //   field: 'identityCard',
  //   label: '身份证',
  //   required: false,
  //   component: 'Input',
  //   rules:  [{ required: false, validator: validateIdNo, trigger: 'blur' }],
  //   colProps: {
  //     span: 24,
  //   },
  // },
  {
    field: 'email',
    label: t('sys.login.email'),
    required: false,
    component: 'Input',
    rules: [{ type: 'email' }],
    colProps: {
      span: 24,
    },
  },
  {
    field: 'birthday',
    component: 'DatePicker',
    label: '出生日期',
    required: false,
    colProps: {
      span: 24,
    },
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
    colProps: {
      span: 24,
    },
  },
];

