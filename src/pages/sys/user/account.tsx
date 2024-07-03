import React, { useState } from 'react';
import { Modal, Button, Form, Input, Select, Message, Upload, DatePicker, InputNumber } from '@arco-design/web-react';
import memberService from '@/api/member';


const FormItem = Form.Item;

function Account({ props }) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  function onOk() {
    form.validate().then((res) => {
      console.log(res)
      setConfirmLoading(true);
      setTimeout(() => {
        Message.success('Success !');
        setVisible(false);
        setConfirmLoading(false);
      }, 1500);
      props.Reload(true);
    })
      .catch((err) => {
        console.log(err);
        setVisible(false);
        setConfirmLoading(false);
      });

  }

  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };
  return (
    <div>
      <Button onClick={() => setVisible(true)}  size='mini'>
        设置账号
      </Button>

      <Modal
        focusLock={true}
        title='设置账号'
        visible={visible}
        onOk={onOk}
        confirmLoading={confirmLoading}
        onCancel={() => setVisible(false)}
      >
        <Form
          {...formItemLayout}
          form={form}
          labelCol={{
            style: { flexBasis: 120 },
          }}
          wrapperCol={{
            style: { flexBasis: 'calc(90% - 120px)' },
          }}
          initialValues={{username:props.username,password:props.password,confirm_password:props.password}}
        >

          <FormItem  label="账号" title="username" field='name' rules={[{ required: true, message: '请输入账号' }]}>
            <Input placeholder='请输入账号' />
          </FormItem>
          <FormItem label="密码" field='password' rules={[{ required: true, message: '请输入密码' }]}>
            <Input placeholder='请输入密码' />
          </FormItem>
          <FormItem
            label="确认密码"
            field='confirm_password'
            dependencies={['password']}
            rules={[{ required: true, message: '请输入密码' },{
              validator: (v, cb) => {
                if (!v) {
                  return cb('密码不能为空')
                } else if (form.getFieldValue('password') !== v) {
                  return cb('两次密码不一致')
                }
                cb(null)
              }
            }]}
          >
            <Input placeholder='请再次输入密码' />
          </FormItem>




        </Form>
      </Modal>
    </div>
  );
}

export default Account;