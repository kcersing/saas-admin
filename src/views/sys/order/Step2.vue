<template>
  <Description
      size="middle"
      title="退款申请"
      :bordered="false"
      :column="3"
      :data="refundData"
      :schema="refundSchema"
  />
  <a-divider />
  <Description
      size="middle"
      title="用户信息"
      :bordered="false"
      :column="3"
      :data="personData"
      :schema="personSchema"
  />
  <a-divider />
  <div class="step2">
    <a-alert message="确认转账后，资金将直接打入对方账户，无法退回。" show-icon />
    <a-descriptions :column="1" class="mt-5">
      <a-descriptions-item label="付款账户"> ant-design@alipay.com </a-descriptions-item>
      <a-descriptions-item label="收款账户"> test@example.com </a-descriptions-item>
      <a-descriptions-item label="收款人姓名"> Vben </a-descriptions-item>
      <a-descriptions-item label="转账金额"> 500元 </a-descriptions-item>
    </a-descriptions>
    <a-divider />


    <BasicForm @register="register">
      <template #fac="{ model, field }">
        <a-input-group compact>
          <a-select v-model:value="model['pay']" class="pay-select">
            <a-select-option value="wx"> 微信 </a-select-option>
            <a-select-option value="zfb"> 支付宝 </a-select-option>
            <a-select-option value="yl"> 银联 </a-select-option>
            <a-select-option value="xxck"> 线下收款 </a-select-option>
          </a-select>
          <a-input class="pay-input" v-model:value="model[field]" />
        </a-input-group>
      </template>
    </BasicForm>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { BasicForm, useForm } from '/@/components/Form';
import { step2Schemas ,refundSchema,personSchema,refundData,personData} from './add.data';
import {Alert, Divider, Descriptions, Select, Input} from 'ant-design-vue';
import { Description } from '/@/components/Description/index';
export default defineComponent({
  components: {
    BasicForm,
    [Alert.name]: Alert,
    [Divider.name]: Divider,
    Description,
    [Descriptions.name]: Descriptions,
    [Descriptions.Item.name]: Descriptions.Item,
    [Select.name]: Select,
    ASelectOption: Select.Option,
    [Input.name]: Input,
    [Input.Group.name]: Input.Group,
    [Divider.name]: Divider,
  },
  emits: ['next', 'prev'],
  setup(_, { emit }) {
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
        setProps({
          submitButtonOptions: {
            loading: true,
          },
        });
        setTimeout(() => {
          setProps({
            submitButtonOptions: {
              loading: false,
            },
          });
          emit('next', values);
        }, 1500);
      } catch (error) {}
    }

    return {
      refundSchema,
      refundData,
      personSchema,
      personData,
      register,
    };
  },
});
</script>
<style lang="less" scoped>
.step2 {
  width: 450px;
  margin: 0 auto;
}
.pay-select {
  width: 20%;
}

.pay-input {
  width: 70%;
}
</style>
