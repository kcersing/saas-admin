<template>
  <BasicModal
      v-bind="$attrs"
      @register="register"
      :title="getTitle"
      @ok="handleSubmit"
  >
    <div class="pt-3px pr-3px">
      <BasicForm @register="registerForm" :model="model"/>
    </div>
  </BasicModal>
</template>
<script lang="ts">
import {computed, defineComponent, ref, unref} from 'vue';
import {BasicModal, useModalInner} from '/@/components/Modal';
import {BasicForm, useForm} from '/@/components/Form/index';
import {formSchema} from "/@/views/sys/member/user.data";
import {BasicDrawer} from "/@/components/Drawer";
import {createOrAddMember} from "/@/api/sys/member";
import {MemberInfo} from "/@/api/sys/model/memberModel";

export default defineComponent({
  components: {BasicDrawer, BasicModal, BasicForm},
  props: {
    userData: {type: Object},
  },
  emits: ['success', 'register'],

  setup(props, {emit}) {
    const isUpdate = ref(true);

    const modelRef = ref({});
    const [
      registerForm,
      {
        resetFields, setFieldsValue, validate, updateSchema
        // setFieldsValue,
        // setProps
      },
    ] = useForm({
      labelWidth: 240,
      schemas: formSchema,
      showActionButtonGroup: false,
      actionColOptions: {
        span: 24,
      },
    });


    const [register, {setModalProps, closeModal}] = useModalInner((data) => {

      resetFields();
      setModalProps({confirmLoading: false});

      isUpdate.value = !!data?.isUpdate;

      if (unref(isUpdate)) {
        setFieldsValue({
          ...data.record,
        });
      }


      // data && onDataReceive(data);
    });


    const getTitle = computed(() =>
        !unref(isUpdate) ? '添加会员信息' : '更新会员信息',
    );

    // function onDataReceive(data) {
    //   console.log('Data Received', data);
    //   // 方式1;
    //   // setFieldsValue({
    //   //   field2: data.data,
    //   //   field1: data.info,
    //   // });
    //
    //   // // 方式2
    //   modelRef.value = { field2: data.data, field1: data.info };
    //
    //   // setProps({
    //   //   model:{ field2: data.data, field1: data.info }
    //   // })
    // }


    async function handleSubmit() {
      console.log('handleSubmit');
      const values = await validate();
      console.log('values', values);
      console.log('values email', values.email);
      setModalProps({confirmLoading: true});
      // defined user id
      let userId: number;
      let password: string;
      if (unref(isUpdate)) {
        userId = Number(values['id']);
        if (values['password'] == undefined) {
          password = '';
        } else {
          password = values['password'];
        }
      } else {
        userId = 0;
      }
      console.log('username', values['username']);
      let params: MemberInfo = {
        id: userId,
        username: values['mobile'],
        name: values['name'],
        nickname: values['nickname'],
        mobile: values['mobile'],
        email: values['email'],
        status: values['status'],
        avatar: values['avatar'],
        password: password,
      };
      console.log('params', params);

      if (params.id == 0) {
        const result = createOrAddMember(params);
        console.log('result', result);
        if (result.code === 0) {
          closeModal();
          emit('success');
        } else {
          setModalProps({ confirmLoading: false });
        }
        return;
      }

    }

    return {register, formSchema, registerForm, model: modelRef, handleSubmit,getTitle};
  },
});
</script>
