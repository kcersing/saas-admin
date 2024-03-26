import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { formatToDateTime } from '/@/utils/dateUtil';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { useMessage } from '/@/hooks/web/useMessage';
import { setOrderStatus } from '/@/api/sys/order';
import {getAllVenue} from "/@/api/sys/universal";

const { t } = useI18n();


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
          setOrderStatus(record.id, newStatus)
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
    field: 'sn',
    label: t('产品名'),
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 30 }],
  },
  {
    field: 'memberId',
    component: 'ApiSelect',
    label: '会员',
    required: true,
    colProps: { span: 8 },
    componentProps: {
      mode: 'multiple',
      api: getAllVenue,
      params: {
        // name: 1,
      },
      resultField: 'data',
      // use name as label
      labelField: 'name',
      // use id as value
      valueField: 'id',
      // not request untill to select
      immediate: true,
      onChange: (e, v) => {
        console.log('ApiSelect====>:', e, v);
      },
      // atfer request callback
      onOptionsChange: (options) => {
        console.log('get options', options.length, options);
      },
    },
  },
  {
    field: 'sell',
    component: 'ApiSelect',
    label: '销售',
    required: true,
    colProps: { span: 8 },
    componentProps: {
      mode: 'multiple',
      api: getAllVenue,
      params: {
        // name: 1,
      },
      resultField: 'data',
      // use name as label
      labelField: 'name',
      // use id as value
      valueField: 'id',
      // not request untill to select
      immediate: true,
      onChange: (e, v) => {
        console.log('ApiSelect====>:', e, v);
      },
      // atfer request callback
      onOptionsChange: (options) => {
        console.log('get options', options.length, options);
      },
    },
  },
  {
    field: 'product',
    component: 'ApiSelect',
    label: '产品',
    required: true,
    colProps: { span: 8 },
    componentProps: {
      mode: 'multiple',
      api: getAllVenue,
      params: {
        // name: 1,
      },
      resultField: 'data',
      // use name as label
      labelField: 'name',
      // use id as value
      valueField: 'id',
      // not request untill to select
      immediate: true,
      onChange: (e, v) => {
        console.log('ApiSelect====>:', e, v);
      },
      // atfer request callback
      onOptionsChange: (options) => {
        console.log('get options', options.length, options);
      },
    },
  },
  {
    field: 'venue',
    component: 'ApiSelect',
    label: '场馆',
    required: true,
    colProps: { span: 8 },
    componentProps: {
      mode: 'multiple',
      api: getAllVenue,
      params: {
        // name: 1,
      },
      resultField: 'data',
      // use name as label
      labelField: 'name',
      // use id as value
      valueField: 'id',
      // not request untill to select
      immediate: true,
      onChange: (e, v) => {
        console.log('ApiSelect====>:', e, v);
      },
      // atfer request callback
      onOptionsChange: (options) => {
        console.log('get options', options.length, options);
      },
    },
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
    field: 'id',
    label: 'id',
    component: 'Input',
    show: false,
  },

  {
    field: 'memberId',
    component: 'ApiSelect',
    label: '会员',
    required: true,
    componentProps: {
      api: getAllVenue,
      params: {
        // name: 1,
      },
      resultField: 'data',
      // use name as label
      labelField: 'name',
      // use id as value
      valueField: 'id',
      // not request untill to select
      immediate: true,
      onChange: (e, v) => {
        console.log('ApiSelect====>:', e, v);
      },
      // atfer request callback
      onOptionsChange: (options) => {
        console.log('get options', options.length, options);
      },
    },
  },
  {
    field: 'sell',
    component: 'ApiSelect',
    label: '销售',
    required: true,
    componentProps: {
      mode: 'multiple',
      api: getAllVenue,
      params: {
        // name: 1,
      },
      resultField: 'data',
      // use name as label
      labelField: 'name',
      // use id as value
      valueField: 'id',
      // not request untill to select
      immediate: true,
      onChange: (e, v) => {
        console.log('ApiSelect====>:', e, v);
      },
      // atfer request callback
      onOptionsChange: (options) => {
        console.log('get options', options.length, options);
      },
    },
  },
  {
    field: 'divider-linked',
    component: 'Divider',
    label: '产品相关',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'product',
    component: 'ApiSelect',
    label: '产品',
    required: true,
    componentProps: {
      api: getAllVenue,
      params: {
        // name: 1,
      },
      resultField: 'data',
      // use name as label
      labelField: 'name',
      // use id as value
      valueField: 'id',
      // not request untill to select
      immediate: true,
      onChange: (e, v) => {
        console.log('ApiSelect====>:', e, v);
      },
      // atfer request callback
      onOptionsChange: (options) => {
        console.log('get options', options.length, options);
      },
    },
  },

  {
    field: 'stockNum',
    label: '数量',
    component: 'InputNumber',
    defaultValue: 1,
  },

  {
    field: 'reason',
    label: '购买类型',
    component: 'Select',
    componentProps: {
      options: [
        { label: t('新购'), value: 1 },
        { label: t('续约'), value: 2 },
      ],
    },
  },

  // {
  //   field: 'stockNum',
  //   label: '续约',
  //   component: 'Input',
  //   show: false,
  // },

  {
    field: 'activationTime',
    component: 'DatePicker',
    label: '激活时间',
  },


  {
    field: 'sellingPrice',
    label: '商品售价',
    component: 'InputNumber',
  },
  {
    field: 'divider-linked2',
    component: 'Divider',
    label: '订单归属场馆',
  },
{
    field: 'venue',
    component: 'ApiSelect',
    label: '场馆',
    required: true,
    componentProps: {
      api: getAllVenue,
      params: {
        // name: 1,
      },
      resultField: 'data',
      // use name as label
      labelField: 'name',
      // use id as value
      valueField: 'id',
      // not request untill to select
      immediate: true,
      onChange: (e, v) => {
        console.log('ApiSelect====>:', e, v);
      },
      // atfer request callback
      onOptionsChange: (options) => {
        console.log('get options', options.length, options);
      },
    },
  },

  {
    field: 'divider-linked3',
    component: 'Divider',
    label: '类型',
  },
  {
    field: 'province',
    component: 'Select',
    label: '购买类型',
    colProps: {
      span: 8,
    },
    componentProps: ({ formModel, formActionType }) => {
      return {
        options: provincesOptions,
        placeholder: '续约产品',
        onChange: (e: any) => {
          // console.log(e)
          // let citiesOptions =
          //     e == 1
          //         ? citiesOptionsData[provincesOptions[0].id]
          //         : citiesOptionsData[provincesOptions[1].id];
          if (e === undefined) {
            // citiesOptions = [];
          }
          if(e == 1){
            formModel.memberProduct = undefined;
            const { updateSchema } = formActionType;
            updateSchema({
              field: 'memberProduct',
              show: false,
            });
          }
          if(e == 2){
            formModel.memberProduct = undefined;
            const { updateSchema } = formActionType;
            updateSchema({
              field: 'memberProduct',
              show: true,
              componentProps: {
                api: getAllVenue,
                params: {
                   name:  ''
                },
                resultField: 'data',
                labelField: 'name',
                valueField: 'id',
                immediate: true,
              },
            });
          }
        },
      };
    },
  },
  {
    field: 'memberProduct',
    component: 'Select',
    label: '会员产品',
    colProps: {
      span: 8,
    },
    componentProps: {
      options: [],
      defalut: [],
      // placeholder: '省份与城市联动',
    },
  },


];



const provincesOptions = [
  {
    id: '1',
    label: '新购',
    value: '1',
    key: '1',
  },
  {
    id: 'xuyue',
    label: '续约',
    value: '2',
    key: '2',
  },
];
// const citiesOptionsData = {
//   xuyue: [
//     {
//       label: '南京市',
//       value: '1',
//       key: '1',
//     },
//     {
//       label: '无锡市',
//       value: '2',
//       key: '2',
//     },
//     {
//       label: '苏州市',
//       value: '3',
//       key: '3',
//     },
//   ],
// };