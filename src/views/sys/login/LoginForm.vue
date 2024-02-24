<!--
 * @Author: GS\Administrator wt4@live.cn
 * @Date: 2024-02-22 10:24:15
 * @LastEditors: GS\Administrator wt4@live.cn
 * @LastEditTime: 2024-02-24 11:24:35
 * @FilePath: \vben-admin\src\views\sys\login\LoginForm.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <LoginFormTitle v-show="getShow" class="enter-x" />
  <Form
    class="p-4 enter-x"
    :model="formData"
    :rules="getFormRules"
    ref="formRef"
    v-show="getShow"
    @keypress.enter="handleLogin"
  >
    <FormItem name="account" class="enter-x">
      <Input
        size="large"
        v-model:value="formData.account"
        :placeholder="t('sys.login.userName')"
        class="fix-auto-fill"
      />
    </FormItem>
    <FormItem name="password" class="enter-x">
      <InputPassword
        size="large"
        visibilityToggle
        v-model:value="formData.password"
        :placeholder="t('sys.login.password')"
      />
    </FormItem>

    <ARow class="enter-x">
      <FormItem name="captcha" class="enter-x" :rules="[{ required: true, len: 5 }]">
        <Input size="large" v-model:value="formData.captcha" :placeholder="t('sys.login.captcha')">
          <template #suffix>
            <img :src="formData.imgPath" class="absolute right-0 h-full cursor-pointer" />
          </template>
        </Input>
      </FormItem>
      <FormItem name="captchaId" class="enter-x" v-show="false">
        <Input :value="formData.captchaId" />
      </FormItem>
    </ARow>

    <ARow class="enter-x">
      <ACol :span="12">
        <FormItem>
          <!-- No logic, you need to deal with it yourself -->
          <Checkbox v-model:checked="rememberMe" size="small">
            {{ t('sys.login.rememberMe') }}
          </Checkbox>
        </FormItem>
      </ACol>
      <ACol :span="12">
        <FormItem :style="{ 'text-align': 'right' }">
          <!-- No logic, you need to deal with it yourself -->
          <Button type="link" size="small" @click="setLoginState(LoginStateEnum.RESET_PASSWORD)">
            {{ t('sys.login.forgetPassword') }}
          </Button>
        </FormItem>
      </ACol>
    </ARow>

    <FormItem class="enter-x">
      <Button type="primary" size="large" block @click="handleLogin" :loading="loading">
        {{ t('sys.login.loginButton') }}
      </Button>
      <!-- <Button size="large" class="mt-4 enter-x" block @click="handleRegister">
        {{ t('sys.login.registerButton') }}
      </Button> -->
    </FormItem>
  </Form>
</template>
<script lang="ts" setup>
  import { reactive, ref, unref, computed } from 'vue'

  import { Checkbox, Form, Input, Row, Col, Button } from 'ant-design-vue'
  import LoginFormTitle from './LoginFormTitle.vue'

  import { useI18n } from '/@/hooks/web/useI18n'
  import { useUserStore } from '/@/store/modules/user'
  import { LoginStateEnum, useLoginState, useFormRules, useFormValid } from './useLogin'
  //import { onKeyStroke } from '@vueuse/core';
  import { PageEnum } from '/@/enums/pageEnum'
  import { useGo } from '/@/hooks/web/usePage'
  import { getCaptcha } from '/@/api/sys/user'
  const ACol = Col
  const ARow = Row
  const FormItem = Form.Item
  const InputPassword = Input.Password
  const go = useGo()
  const { t } = useI18n()

  const userStore = useUserStore()

  const { setLoginState, getLoginState } = useLoginState()
  const { getFormRules } = useFormRules()

  const formRef = ref()
  const loading = ref(false)
  const rememberMe = ref(false)

  const formData = reactive({
    account: '',
    password: '',
    captcha: '',
    captchaId: '',
    imgPath: '',
  })

  const { validForm } = useFormValid(formRef)

  //onKeyStroke('Enter', handleLogin);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN)

  async function handleLogin() {
    const data = await validForm()
    if (!data) return
    loading.value = true
    userStore
      .login({
        password: data.password,
        username: data.account,
        captcha: data.captcha,
        captchaId: data.captchaId,
        mode: 'message',
      })
      .then(() => {
        loading.value = false
        go(PageEnum.BASE_HOME)
      })
      .catch(() => {
        getCaptchaData()
        loading.value = false
      })
  }

  // get captcha
  async function getCaptchaData() {
    const captcha = await getCaptcha('none')
    console.log(captcha)
    formData.captchaId = captcha.data.id
    formData.imgPath = captcha.data.b64s
  }

  getCaptchaData()
</script>
