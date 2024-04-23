import {
  Form,
  Input,
  Checkbox,
  Link,
  Button,
  Space,
  Image,
} from '@arco-design/web-react';
import { FormInstance } from '@arco-design/web-react/es/Form';
import { IconLock, IconUser,IconCode} from '@arco-design/web-react/icon';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import useStorage from '@/utils/useStorage';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import styles from './style/index.module.less';
import { getImgCaptcha } from '@/api/captcha';
import userService, { LoginData} from '@/api/user';
import { setToken } from '@/utils/auth';
export default function LoginForm() {
  const formRef = useRef<FormInstance>();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginParams, setLoginParams, removeLoginParams] = useStorage('loginParams');

  const t = useLocale(locale);

  const [rememberPassword, setRememberPassword] = useState(!!loginParams);
  const [imgPath, setImgPath] = useState('');
  const [captchaId, setCaptchaId] = useState('');










  function afterLoginSuccess(params) {
    // 记住密码
    if (rememberPassword) {
      setLoginParams(JSON.stringify(params));
    } else {
      removeLoginParams();
    }
    // 记录登录状态
    localStorage.setItem('userStatus', 'login');
    // 跳转首页
    window.location.href = '/';
  }

  function login(params) {
    setErrorMessage('');
    setLoading(true);
    params['captchaId']= captchaId;
    userService.login(params).then()
      .then((res) => {
        const { code,message,token } = res;
        if (code === 200) {
          setToken(token)
          afterLoginSuccess(params);
        } else {
          setErrorMessage(message || t['login.form.login.errMsg']);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function onSubmitClick() {
    formRef.current.validate().then((values) => {
      login(values);
    });
  }
 
 
  // 读取 localStorage，设置初始值
  useEffect(() => {
    const rememberPassword = !!loginParams;
    setRememberPassword(rememberPassword);
    if (formRef.current && rememberPassword) {
      const parseParams = JSON.parse(loginParams);
      formRef.current.setFieldsValue(parseParams);
    }

    getImgCaptcha().then((res) => {
      setImgPath(res.imgPath)
      setCaptchaId(res.captchaId)
    }).catch(err => {
      //登录失败。处理区域...
    });

    // handleOnClick()
  }, [loginParams]);

  return (
    <div className={styles['login-form-wrapper']}>
      <div className={styles['login-form-title']}>{t['login.form.title']}</div>
      <div className={styles['login-form-sub-title']}>
        {t['login.form.title']}
      </div>
      <div className={styles['login-form-error-msg']}>{errorMessage}</div>
      <Form
        className={styles['login-form']}
        layout="vertical"
        ref={formRef}
        initialValues={{ username: 'admin', password: 'admin' }}
      >
        <Form.Item
          field="username"
          rules={[{ required: true, message: t['login.form.userName.errMsg'] }]}
        >
          <Input
            prefix={<IconUser />}
            placeholder={t['login.form.userName.placeholder']}
            onPressEnter={onSubmitClick}
          />
        </Form.Item>

        <Form.Item
          field="password"
          rules={[{ required: true, message: t['login.form.password.errMsg'] }]}
        >
          <Input.Password
            prefix={<IconLock />}
            placeholder={t['login.form.password.placeholder']}
            onPressEnter={onSubmitClick}
          />
        </Form.Item> 
        <Image width={200} src={imgPath} alt='lamp' />
        <Form.Item
          field="captcha"
          rules={[{ required: true, message: '请输入验证码'} ]} 
        >
          <Input
            prefix={<IconCode />}
            placeholder='请输入验证码'
            onPressEnter={onSubmitClick}
          />
        </Form.Item>

        <Space size={16} direction="vertical">
          <div className={styles['login-form-password-actions']}>
            <Checkbox checked={rememberPassword} onChange={setRememberPassword}>
              {t['login.form.rememberPassword']}
            </Checkbox>
            <Link>{t['login.form.forgetPassword']}</Link>
          </div>
          <Button type="primary" long onClick={onSubmitClick} loading={loading}>
            {t['login.form.login']}
          </Button>
          <Button
            type="text"
            long
            className={styles['login-form-register-btn']}
          >
            {t['login.form.register']}
          </Button>
        </Space>
      </Form>
    </div>
  );
}