<template>
  <BasicModal
      v-bind="$attrs"
      @register="register"
      :title="getTitle"
      @ok="handleSubmit"
  >
    <div class="pt-3px pr-3px">

      <CollapseContainer title="头像上传">
        <CropperAvatar :uploadApi="uploadApi" :value="avatar" />
      </CollapseContainer>

      <BasicForm @register="registerForm" :model="model" />

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
import {CreateOrUpdateMemberReq} from "/@/api/sys/model/memberModel";
import { uploadApi } from '/@/api/sys/upload';

import { CollapseContainer } from '/@/components/Container';
import { CropperImage, CropperAvatar } from '/@/components/Cropper';
import { useUserStore } from '/@/store/modules/user';
import img from '/@/assets/images/header.jpg';
export default defineComponent({
  components: {BasicDrawer, BasicModal, BasicForm,
    CropperImage,
    CollapseContainer,
    CropperAvatar,
  },
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
      if (unref(isUpdate)) {
        userId = Number(values['id']);
      } else {
        userId = 0;
      }
      console.log('username', values['username']);
      let params: CreateOrUpdateMemberReq = {
        id: userId,
        name: values['name'],
        nickname: values['nickname'],
        mobile: values['mobile'],
        email: values['email'],
        status: values['status'],
        birthday: values['birthday'],
        gender: values['gender'],
        wecom: values['wecom'],
        avatar:  values['avatar'],
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

    const info = ref('');
    const cropperImg = ref('');
    const circleInfo = ref('');
    const circleImg = ref('');
    const userStore = useUserStore();
    const avatar = ref(userStore.getUserInfo?.avatar || '');


    return {register, formSchema, registerForm, model: modelRef, handleSubmit,getTitle,


      img,
      info,
      circleInfo,
      cropperImg,
      circleImg,
      avatar,
      uploadApi: uploadApi as any,

    };
  },
});
</script>
<style scoped>
.container {
  display: flex;
  width: 100vw;
  align-items: center;
}

.cropper-container {
  width: 40vw;
}

.croppered {
  height: 360px;
}

p {
  margin: 10px;
}
</style>