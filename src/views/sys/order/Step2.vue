<template>

  <div class="p-4">
    <Description
        title="基础示例"
        :collapseOptions="{ canExpand: true, helpMessage: 'help me' }"
        :column="3"
        :data="mockData"
        :schema="schema"
    />
    <Description @register="register1" class="mt-4" />
  </div>

  <div class="w-200 m-auto">
    <Alert message="确认转账后，资金将直接打入对方账户，无法退回。" show-icon />
    <Descriptions title="订单信息" :column="1" class="mt-5">
      <Descriptions.Item label="付款账户"> ant-design@alipay.com </Descriptions.Item>
      <Descriptions.Item label="收款账户"> test@example.com </Descriptions.Item>
      <Descriptions.Item label="收款人姓名"> Vben </Descriptions.Item>
      <Descriptions.Item label="转账金额"> 500元 </Descriptions.Item>
    </Descriptions>
    <Divider />
    <Descriptions title="用户信息" size="small" :column="2">
      <Descriptions.Item label="创建人"> 曲丽丽 </Descriptions.Item>
      <Descriptions.Item label="订购产品"> XX 服务 </Descriptions.Item>
      <Descriptions.Item label="创建时间"> 2017-01-10 </Descriptions.Item>
      <Descriptions.Item label="关联单据">
        <a>12421</a>
      </Descriptions.Item>
      <Descriptions.Item label="生效日期"> 2017-07-07 ~ 2017-08-08 </Descriptions.Item>
      <Descriptions.Item label="备注"> 请于两个工作日内确认 </Descriptions.Item>
    </Descriptions>
    <Divider />

    <BasicForm @register="register">
      <template #fac="{ model, field }">
        <Input.Group compact>
          <Select v-model:value="model['pay']" class="pay-select">
            <Select.Option value="wx"> 微信 </Select.Option>
            <Select.Option value="zfb"> 支付宝 </Select.Option>
            <Select.Option value="yl"> 银联 </Select.Option>
            <Select.Option value="wx"> 线下收银 </Select.Option>
          </Select>
          <a-input class="pay-input" v-model:value="model[field]" />
        </Input.Group>
      </template>
    </BasicForm>


  </div>
</template>
<script lang="ts" setup>
  import { BasicForm, useForm } from '/@/components/Form';
  import { step2Schemas } from './addOrder.data';
  import {Alert, Divider, Input,Descriptions, Select, Card, Empty} from 'ant-design-vue';
  const emit = defineEmits(['next', 'prev']);

  import { Description, DescItem, useDescription } from '/@/components/Description';
  const mockData: any = {
    username: 'test',
    nickName: 'VB',
    age: 123,
    phone: '15695909xxx',
    email: '190848757@qq.com',
    addr: '厦门市思明区',
    sex: '男',
    certy: '3504256199xxxxxxxxx',
    tag: 'orange',
  };
  const schema: DescItem[] = [
    {
      field: 'username',
      label: '用户名',
    },
    {
      field: 'nickName',
      label: '昵称',
      render: (curVal, data) => {
        return `${data.username}-${curVal}`;
      },
    },
    {
      field: 'phone',
      label: '联系电话',
    },
    {
      field: 'email',
      label: '邮箱',
    },
    {
      field: 'addr',
      label: '地址',
    },
  ];
  // export default defineComponent({
  //   components: { Description, Alert },
  //   setup() {
  //
  //   },
  // });


  const [register1] = useDescription({
    title: 'useDescription',
    data: mockData,
    schema: schema,
  });



  const [register, { validate, setProps }] = useForm({
    labelWidth: 80,
    schemas: step2Schemas,
    actionColOptions: {
      span: 14,
    },
    resetButtonOptions: {
      text: '上一步',
    },
    submitButtonOptions: {
      text: '提交',
    },
    resetFunc: customResetFunc,
    submitFunc: customSubmitFunc,
  });

  async function customResetFunc() {
    emit('prev');
  }

  async function customSubmitFunc() {
    try {
      const values = await validate();

      console.log("2222222222222222")
      console.log(values)
      console.log("2222222222222222")
      setProps({
        submitButtonOptions: {
          loading: true,
        },
      });


      // let params: OrderInfo = {
      //   price: values['price'],
      //   stock: values['stock'],
      //   propertyId:values['property'] ,
      //   name: values['name'],
      //   status: values['status'],
      // };
      //
      //   const result = await createOrAddOrder(params, 'message');

      if(1){
          setProps({
            submitButtonOptions: {
              loading: false,
            },
          });
        emit('next', values);
      }

      // setTimeout(() => {
      //   setProps({
      //     submitButtonOptions: {
      //       loading: false,
      //     },
      //   });
      //   emit('next', values);
      // }, 1500);

    } catch (error) {
      console.error(error);
    }
  }
</script>
