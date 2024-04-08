import { FormSchema } from '/@/components/Form';
import {getUserList} from "/@/api/sys/user";
import {getProductList} from "/@/api/sys/product";
import {getAllVenue} from "/@/api/sys/universal";
import {DescItem} from "/@/components/Description";

let labelField;
export const step1Schemas: FormSchema[] = [

  {
    field: 'memberId',
    component: 'Input',
    label: '会员搜索',
    helpMessage: ['ApiSelect组件', '将关键词发送到接口进行远程搜索'],
    required: true,
    slot: 'remoteSearch',
    colProps: {
      span: 24,
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
      multiple: true,
      showSearch: true,
      api: getUserList,
      params: {
         name: labelField,
      },
      resultField: 'data',
      // use name as label
      labelField: 'username',
      // use id as value
      valueField: 'id',
      // not request untill to select
      immediate: false,
      onChange: (e, v) => {
        console.log('ApiSelect====>:', e, v.nickname);
      },
      // atfer request callback
      onOptionsChange: (options) => {
        // labelField=options.value


        
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
    component: 'InputGroup',
    label: '收款方式',
    required: true,
    defaultValue: 'wx',
    slot: 'fac',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'pay',
    component: 'Input',
    label: '',
    defaultValue: 'zfb',
    show: false,
  },
];

export const refundSchema: DescItem[] = [
  {
    field: 'a1',
    label: '取货单号',
  },
  {
    field: 'a2',
    label: '状态',
  },
  {
    field: 'a3',
    label: '销售单号',
  },
  {
    field: 'a4',
    label: '子订单',
  },
];
export const personSchema: DescItem[] = [
  {
    field: 'b1',
    label: '用户姓名',
  },
  {
    field: 'b2',
    label: '联系电话',
  },
  {
    field: 'b3',
    label: '常用快递',
  },
  {
    field: 'b4',
    label: '取货地址',
  },
  {
    field: 'b5',
    label: '备注',
  },
];
export const refundData = {
  a1: '1000000000',
  a2: '已取货',
  a3: '1234123421',
  a4: '3214321432',
};
export const personData = {
  b1: '付小小',
  b2: '18100000000',
  b3: '菜鸟仓储',
  b4: '浙江省杭州市西湖区万塘路18号',
  b5: '无',
};

//    <BasicForm @register="register">
//       <template #fac="{ model, field }">
//         <a-input-group compact>
//           <a-select v-model:value="model['pay']" class="pay-select">
//             <a-select-option value="wx"> 微信 </a-select-option>
//             <a-select-option value="zfb"> 支付宝 </a-select-option>
//             <a-select-option value="yl"> 银联 </a-select-option>
//             <a-select-option value="xxck"> 线下收款 </a-select-option>
//           </a-select>
//           <a-input class="pay-input" v-model:value="model[field]" />
//         </a-input-group>
//       </template>
//     </BasicForm>

//  <Description
//       size="middle"
//       title="退款申请"
//       :bordered="false"
//       :column="3"
//       :data="refundData"
//       :schema="refundSchema"
//   />
//   <a-divider />
//   <Description
//       size="middle"
//       title="用户信息"
//       :bordered="false"
//       :column="3"
//       :data="personData"
//       :schema="personSchema"
//   />
//   <a-divider />