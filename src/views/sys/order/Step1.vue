<template>
  <div class="step1">
    <div class="step1-form">
      <BasicForm @register="register">
        <template #remoteSearch="{ model, field }">
          <ApiSelect
              :api="getMemberList"
              showSearch
              v-model:value="model[field]"
              :filterOption="false"
              resultField="data"
              labelField="nickname"
              valueField="id"
              :params="searchParams"
              @search="onSearch"
          />
        </template>
        <Alert message="内外同时同时显示隐藏" show-icon />
      </BasicForm>
    </div>
    <a-divider />
    <h3>说明</h3>
    <h4>转账到支付宝账户</h4>
    <p>
      如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
    </p>

    <h4>转账到银行卡</h4>
    <p>
      如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
    </p>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, unref, ref } from 'vue';
import { step1Schemas } from './add.data';
import { BasicForm, useForm ,ApiSelect} from '/@/components/Form';

import { Alert } from 'ant-design-vue';

import {getMemberList} from "/@/api/sys/member";
import { useDebounceFn } from '@vueuse/core';
export default defineComponent({
  methods: {getMemberList},
  components: {
    BasicForm,
    ApiSelect,Alert,
  },
  emits: ['next'],
  setup(_, { emit }) {
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

    const name = ref<string>('');
    const searchParams = computed<Recordable>(() => {
      return { name: unref(name) };
    });

    function onSearch(value: string) {
      name.value = value;
    }

    async function customSubmitFunc() {
      try {
        const values = await validate();
        emit('next', values);
      } catch (error) {}
    }

    return {
      register,
      getMemberList,
      onSearch: useDebounceFn(onSearch, 900),
      searchParams,

    };
  },
});
</script>
<style lang="less" scoped>
.step1 {
  &-form {
    width: 450px;
    margin: 0 auto;
  }

  h3 {
    margin: 0 0 12px;
    font-size: 16px;
    line-height: 32px;
    color: @text-color;
  }

  h4 {
    margin: 0 0 4px;
    font-size: 14px;
    line-height: 22px;
    color: @text-color;
  }

  p {
    color: @text-color;
  }
}

.pay-select {
  width: 20%;
}

.pay-input {
  width: 70%;
}
</style>
