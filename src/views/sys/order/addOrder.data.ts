import { FormSchema } from '/@/components/Form';
import {getUserList} from "/@/api/sys/user";
import {getProductList} from "/@/api/sys/product";
import {getAllVenue} from "/@/api/sys/universal";
import {getMemberList} from "/@/api/sys/member";


export const step1Schemas: FormSchema[] = [
  {
    field: 'memberId',
    component: 'ApiSelect',
    label: '会员',
    required: false,
    colProps: {
      span: 24,
    },
    componentProps: {
      api: await getMemberList,
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
    required: false,
    colProps: {
      span: 24,
    },
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
    required: false,
    colProps: {
      span: 24,
    },
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
    colProps: {
      span: 24,
    },
  },

  // {
  //   field: 'reason',
  //   label: '购买类型',
  //   component: 'Select',
  //   colProps: {
  //     span: 24,
  //   },
  //   componentProps: {
  //     options: [
  //       { label: '新购', value: 1 },
  //       { label: '续约', value: 2 },
  //     ],
  //   },
  // },

  // {
  //   field: 'activationTime',
  //   component: 'DatePicker',
  //   label: '激活时间',
  //   colProps: {
  //     span: 24,
  //   },
  // },

  {
    field: 'money',
    component: 'Input',
    label: '商品售价',
    defaultValue: '0',
    required: false,
    renderComponentContent: () => {
      return {
        prefix: () => '￥',
      };
    },
    colProps: {
      span: 24,
    },
  },

  {
    field: 'divider-linked2',
    component: 'Divider',
    label: '订单归属场馆',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'venue',
    component: 'ApiSelect',
    label: '场馆',
    required: false,
    colProps: {
      span: 24,
    },
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
    colProps: {
      span: 24,
    },
  },
  {
    field: 'province',
    component: 'Select',
    label: '购买类型',
    colProps: {
      span: 24,
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
      span: 24,
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
export const step2Schemas: FormSchema[] = [
  {
    field: 'fac',
    label: '收款账户',
    required: false,
    defaultValue: '',
    slot: 'fac',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'paymentAmount',
    component: 'Input',
    label: '支付金额',
    required: false,
    renderComponentContent: () => {
      return {
        prefix: () => '￥',
      };
    },
    colProps: {
      span: 24,
    },
  },
];
