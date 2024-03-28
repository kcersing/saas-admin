<template>
  <BasicModal
      v-bind="$attrs"
      @register="register"
      :title="getTitle"
      @visible-change="handleVisibleChange"
      @ok="handleSubmit"
  >
    <div class="pt-3px pr-3px">
      <BasicForm @register="registerForm" :model="modelRef" />
    </div>

    <BasicForm @register="registerForm2" />
  </BasicModal>
</template>
<script lang="ts" setup>
import {ref, nextTick, computed, unref} from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicForm, FormSchema, useForm } from '/@/components/Form';
import { formSchema } from './order.data';
import {BasicDrawer} from "/@/components/Drawer";
import {useI18n} from "vue-i18n";
import {OrderInfo} from "/@/api/sys/model/orderModel";
import {createOrAddOrder, createOrUpdateOrder} from "/@/api/sys/order";
const isUpdate = ref(true);
const { t } = useI18n();
const [registerForm2, { resetFields, setFieldsValue, validate }] = useForm({
  labelWidth: 90,
  baseColProps: { span: 24 },
  schemas: formSchema,
  showActionButtonGroup: false,
});
const schemas: FormSchema[] = [
  {
    field: 'field1',
    component: 'Input',
    label: '字段1',
    colProps: {
      span: 24,
    },
    defaultValue: '111',
  },
  {
    field: 'field2',
    component: 'Input',
    label: '字段2',
    colProps: {
      span: 24,
    },
  },
];

const props = defineProps({
  userData: { type: Object },
});
const modelRef = ref({});
const [
  registerForm,
  // {
  //   // setFieldsValue,
  //   // setProps
  // },
] = useForm({
  labelWidth: 120,
  schemas,
  showActionButtonGroup: false,
  actionColOptions: {
    span: 24,
  },
});

const [register, { setModalProps, closeModal}] = useModalInner(async (data) => {
  data && onDataReceive(data);

  await resetFields();
  setModalProps({confirmLoading: false});

  isUpdate.value = !!data?.isUpdate;

  if (unref(isUpdate)) {
    await setFieldsValue({
      ...data.record,
    });
  }


});

function onDataReceive(data) {
  console.log('Data Received', data);
  // 方式1;
  // setFieldsValue({
  //   field2: data.data,
  //   field1: data.info,
  // });

  // // 方式2
  modelRef.value = { field2: data.data, field1: data.info };

  // setProps({
  //   model:{ field2: data.data, field1: data.info }
  // })
}


const getTitle = computed(() =>
    !unref(isUpdate) ? t('添加产品') : t('更新产品'),
);
const emit = defineEmits(['success', 'register'])
async function handleSubmit() {
  const values = await validate();
  console.log(values);
  setModalProps({ confirmLoading: true });
  // defined user id
  let productId: number;
  if (unref(isUpdate)) {
    productId = Number(values['id']);
  }   else {
    productId = 0;
  }
  let params: OrderInfo = {
    id:productId,
    status: values['status'],
  };

  if (params.id == 0) {
    const result = await createOrAddOrder(params, 'message');
    if (result.code === 0) {
      closeModal();
      emit('success');
    } else {
      setModalProps({ confirmLoading: false });
    }
    return;
  }
  const result = await createOrUpdateOrder(params, 'message');
  if (result.code === 0) {
    closeModal();
    emit('success');
  } else {
    setModalProps({ confirmLoading: false });
  }
}


function handleVisibleChange(v) {
  v && props.userData && nextTick(() => onDataReceive(props.userData));
}
</script>
