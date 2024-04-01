<template>
  <div class="step1">
    <div class="step1-form">

      <BasicForm @register="register" />
    </div>
    <Divider />
    <h3>说明</h3>
    <h4>添加订单</h4>
    <p>
      添加订单添加订单添加订单添加订单添加订单添加订单添加订单添加订单添加订单添加订单添加订单。
    </p>
    <h4>选择会员</h4>
    <p>
      选择会员选择会员选择会员选择会员选择会员选择会员选择会员选择会员选择会员选择会员选择会员选择会员选择会员。
    </p>
  </div>
</template>
<script lang="ts" setup>
  import { BasicForm, useForm } from '/@/components/Form';
  import { step1Schemas } from './addOrder.data';

  import { Select, Input, Divider } from 'ant-design-vue';


  import {createOrAddOrder} from '/@/api/sys/order';
  import {OrderInfo} from "/@/api/sys/model/orderModel";

  const emit = defineEmits(['next']);

  const [register, { validate }] = useForm({
    labelWidth: 100,
    schemas: step1Schemas,
    actionColOptions: {
      span: 14,
    },
    showResetButton: false,
    submitButtonOptions: {
      text: '下一步',
    },
    submitFunc: customSubmitFunc,
  });

  async function customSubmitFunc() {
    try {
      const values = await validate();


      console.log("111111111111111111111111111111111111")
      console.log(values)
      console.log("111111111111111111111111111111111111")

      // let params: OrderInfo = {
      //   price: values['price'],
      //   stock: values['stock'],
      //   propertyId:values['property'] ,
      //   name: values['name'],
      //   status: values['status'],
      // };
      //
      //   const result = await createOrAddOrder(params, 'message');


      emit('next', values);
    } catch (error) {
      //
    }
  }
</script>
<style lang="less" scoped>
  .step1 {
    &-form {
      width: 450px;
      margin: 0 auto;
    }

    h3 {
      margin: 0 0 12px;
      color: @text-color-base;
      font-size: 16px;
      line-height: 32px;
    }

    h4 {
      margin: 0 0 4px;
      color: @text-color-base;
      font-size: 14px;
      line-height: 22px;
    }

    p {
      color: @text-color-base;
    }
  }

  .pay-select {
    width: 20%;
  }

  .pay-input {
    width: 70%;
  }
</style>
