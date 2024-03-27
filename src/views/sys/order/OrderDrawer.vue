<template>
  <BasicDrawer
      v-bind="$attrs"
      @register="registerDrawer"
      showFooter
      :title="getTitle"
      width="500px"
      @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
import { defineComponent, ref, computed, unref } from 'vue';
import { BasicForm, useForm } from '/@/components/Form/index';
import { formSchema } from './order.data';
import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
import { useI18n } from 'vue-i18n';
import {createOrAddOrder, createOrUpdateOrder} from '/@/api/sys/order';
import {OrderInfo} from "/@/api/sys/model/orderModel";

export default defineComponent({
  name: 'OrderDrawer',
  components: { BasicDrawer, BasicForm },
  emits: ['success', 'register'],
  setup(_, { emit }) {
    const isUpdate = ref(true);
    const { t } = useI18n();

    const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
      labelWidth: 90,
      baseColProps: { span: 24 },
      schemas: formSchema,
      showActionButtonGroup: false,
    });

    const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
      await resetFields();
      setDrawerProps({ confirmLoading: false });

      isUpdate.value = !!data?.isUpdate;

      if (unref(isUpdate)) {
        await setFieldsValue({
          ...data.record,
        });
      }
    });

    const getTitle = computed(() =>
        !unref(isUpdate) ? t('添加产品') : t('更新产品'),
    );

    async function handleSubmit() {
      const values = await validate();
      console.log(values);
      setDrawerProps({ confirmLoading: true });
      // defined user id
      let productId: number;
      if (unref(isUpdate)) {
        productId = Number(values['id']);
      }   else {
        productId = 0;
      }
      let params: OrderInfo = {
        id:productId,
        price: values['price'],
        stock: values['stock'],
        propertyId:values['property'] ,
        name: values['name'],
        status: values['status'],
      };

      if (params.id == 0) {
        const result = await createOrAddOrder(params, 'message');
        if (result.code === 0) {
          closeDrawer();
          emit('success');
        } else {
          setDrawerProps({ confirmLoading: false });
        }
        return;
      }
      const result = await createOrUpdateOrder(params, 'message');
      if (result.code === 0) {
        closeDrawer();
        emit('success');
      } else {
        setDrawerProps({ confirmLoading: false });
      }
    }

    return {
      registerDrawer,
      registerForm,
      handleSubmit,
      getTitle,
    };
  },
});
</script>
