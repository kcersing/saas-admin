import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { formatToDateTime } from '/@/utils/dateUtil';
import { h} from 'vue';
import { Switch } from 'ant-design-vue';
import { useMessage } from '/@/hooks/web/useMessage';
import { setOrderStatus } from '/@/api/sys/order';
import {getAllVenue} from "/@/api/sys/universal";
import {getUserList} from "/@/api/sys/user";
import {getMemberList} from "/@/api/sys/member";
import {getProductList} from "/@/api/sys/product";

const { t } = useI18n();

const memberList = await getMemberList

export const columns: BasicColumn[] = [

  //    `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'primary key',
    //   `created_at` timestamp NOT NULL COMMENT 'created time',
    //   `updated_at` timestamp NOT NULL COMMENT 'last update time',
    //   `order_sn` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '订单编号',
    //   `venue_id` bigint DEFAULT NULL COMMENT '场馆id',
    //   `member_id` bigint DEFAULT NULL COMMENT '会员id',
    //   `status` bigint DEFAULT '0' COMMENT '状态',
    //   `source` varchar(255) COLLATE utf8mb4_bin DEFAULT '' COMMENT '订单来源',
    //   `device` varchar(255) COLLATE utf8mb4_bin DEFAULT '' COMMENT '设备来源',
    //   `completion_at` timestamp NULL DEFAULT NULL COMMENT '订单完成时间',
    //   `create_id` bigint DEFAULT NULL COMMENT '创建人id',

  {
    title: t('订单编号'),
    dataIndex: 'order_sn',
    width: 30,
  },
  {
    title: t('场馆'),
    dataIndex: 'venue_id',
    width: 30,
  },
  {
    title: t('会员'),
    dataIndex: 'member_id',
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
    title: t('创建时间'),
    dataIndex: 'created_at',
    width: 50,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
    {
        title: t('订单完成时间'),
        dataIndex: 'completion_at',
        width: 50,
        customRender: ({ record }) => {
            return formatToDateTime(record.createdAt);
        },
  },
];



export const searchFormSchema: FormSchema[] = [
  {
    field: 'memberId',
    component: 'Input',
    label: '会员',
    helpMessage: ['输入会员手机号搜索会员'],
    required: false,
    colProps: { span: 8 },
    // componentProps: {
    //   onChange: (e: any) => {
    //     console.log(e.srcElement.value);
    //   },
    //   api: getUserList,
    //   params:(e) => {
    //     console.log(e);
    //   },
    // },
  },

  {
    field: 'sell',
    component: 'ApiSelect',
    label: '销售',
    required: false,
    colProps: { span: 8 },
    componentProps:  {
        placeholder: '请选择',
        multiple: false,
        showSearch: true,
        api: getUserList,
        params: {
          // name:""
        },
        resultField: 'data',
        labelField: 'nickname',
        valueField: 'id',
        immediate: false,
    },
  },
  {
    field: 'product',
    component: 'ApiSelect',
    label: '产品',
    required: false,
    colProps: { span: 8 },
    componentProps: {
      multiple: false,
      showSearch: true,
      api: getProductList,
      params: {
        // name: 1,
      },
      resultField: 'data',
      // use name as label
      labelField: 'name',
      // use id as value
      valueField: 'id',
      // not request untill to select
      immediate: false,
      // onChange: (e, v) => {
      //   console.log('ApiSelect====>:', e, v);
      // },
      // // atfer request callback
      // onOptionsChange: (options) => {
      //   console.log('get options', options.length, options);
      // },
    },
  },
  {
    field: 'venue',
    component: 'ApiSelect',
    label: '场馆',
    required: false,
    colProps: { span: 8 },
    componentProps: {
      // mode: 'multiple',
      api: getAllVenue,
      params: {
        // name: 1,
      },
      multiple: false,
      showSearch: true,
      resultField: 'data',
      // use name as label
      labelField: 'name',
      // use id as value
      valueField: 'id',
      // not request untill to select
      immediate: false,
      // onChange: (e, v) => {
      //   console.log('ApiSelect====>:', e, v);
      // },
      // // atfer request callback
      // onOptionsChange: (options) => {
      //   console.log('get options', options.length, options);
      // },
    },
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
    field: 'memberId',
    component: 'ApiSelect',
    label: '会员',
    required: true,
    componentProps: {
      api: memberList,
      params: {
        page: 1,
        pageSize: 999,
      },
      resultField: 'data',
      // use name as label
      labelField: 'nickname',
      // use id as value
      valueField: 'id',
      // not request untill to select
      immediate: false,
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
      // mode: 'multiple',
      multiple: true,
      showSearch: true,
      api: getUserList,
      params: {
        // name: 1,
      },
      resultField: 'data',
      // use name as label
      labelField: 'name',
      // use id as value
      valueField: 'id',
      // not request untill to select
      immediate: false,
      // onChange: (e, v) => {
      //   console.log('ApiSelect====>:', e, v);
      // },
      // // atfer request callback
      // onOptionsChange: (options) => {
      //   console.log('get options', options.length, options);
      // },
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
      api: getProductList,
      params: {
        // name: 1,
      },
      resultField: 'data',
      // use name as label
      labelField: 'name',
      // use id as value
      valueField: 'id',
      // not request untill to select
      immediate: false,
      // onChange: (e, v) => {
      //   console.log('ApiSelect====>:', e, v);
      // },
      // // atfer request callback
      // onOptionsChange: (options) => {
      //   console.log('get options', options.length, options);
      // },
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
    required: false,
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
      immediate: false,
      // onChange: (e, v) => {
      //   console.log('ApiSelect====>:', e, v);
      // },
      // // atfer request callback
      // onOptionsChange: (options) => {
      //   console.log('get options', options.length, options);
      // },
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
                   name:  '1234'
                },
                resultField: 'data',
                labelField: 'name',
                valueField: 'id',
                immediate: false,
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