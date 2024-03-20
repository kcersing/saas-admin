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
  import { formSchema } from './property.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { useI18n } from 'vue-i18n';
  import {createOrAddProperty, createOrUpdateProperty} from '/@/api/sys/product';
  import {PropertyInfo} from "/@/api/sys/model/productModel";

  export default defineComponent({
    name: 'PropertyDrawer',
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
        !unref(isUpdate) ? t('添加属性') : t('更新属性'),
      );

      async function handleSubmit() {
        const values = await validate();
        console.log(values);
        setDrawerProps({ confirmLoading: true });
        // defined user id
        let propertyId: number;
        if (unref(isUpdate)) {
          propertyId = Number(values['id']);
        }   else {
          propertyId = 0;
      }
        let params: PropertyInfo = {
          id: propertyId,
          name: values['name'],
          status: values['status'],
          price: values['price'],
          duration: values['duration'],
          type: values['type'],
          length: values['length'],
          count: values['count'],
          venueId:values['venue'] ,
          data: ''
        };

        if (params.id == 0) {
          const result = await createOrAddProperty(params, 'message');
          if (result.code === 0) {
            closeDrawer();
            emit('success');
          } else {
            setDrawerProps({ confirmLoading: false });
          }
          return;
        }
        const result = await createOrUpdateProperty(params, 'message');
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
