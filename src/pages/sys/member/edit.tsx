import { useState } from 'react';
import { Modal, Button, Form, Input, Select, Message ,Avatar,Upload,InputNumber,Progress  } from '@arco-design/web-react';


import { IconPlus, IconEdit } from '@arco-design/web-react/icon';
import AvatarUpload from '@/pages/sys/member/avatar';
const FormItem = Form.Item;

function EditMember({ props }) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  function onOk() {
    form.validate().then((res) => {
      console.log(res);
      setConfirmLoading(true);
      setTimeout(() => {
        Message.success('Success !');
        setVisible(false);
        setConfirmLoading(false);
      }, 1500);
    });
  }

  const formItemLayout = {
    labelCol: {
      span: 4
    },
    wrapperCol: {
      span: 20
    }
  };

  return (
    <div>
      <Button onClick={() => setVisible(true)} type="primary">编辑</Button>
      <Modal
        title="编辑会员"
        visible={visible}
        onOk={onOk}
        confirmLoading={confirmLoading}
        onCancel={() => setVisible(false)}
      >
        <Form
          {...formItemLayout}
          form={form}
          labelCol={{
            style: { flexBasis: 90 }
          }}
          wrapperCol={{
            style: { flexBasis: 'calc(100% - 90px)' }
          }}
          initialValues={{ name: props.name,mobile: props.mobile,email: props.email,gender: props.gender }}
        >

          <Form.Item
            label='头像'
            field='avatar'
            triggerPropName='fileList'
            initialValue={[
              {
                uid: '-1',
                url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
                name: '20200717',
              },
            ]}
          >
          <AvatarUpload />

        </Form.Item>
          <FormItem label="手机号" field="mobile" rules={[{ required: true }]}>
            <Input placeholder=""  />
          </FormItem>
          <FormItem label="姓名" field="name" rules={[{ required: true }]}>
            <Input placeholder=""  />
          </FormItem>
          <FormItem label="性别" field="gender" rules={[{ required: false }]}>
            <Select options={['男', '女', '保密']} />
          </FormItem>
          <FormItem label='年龄' field='age' rules={[{ type: 'number', required: true }]}>
            <InputNumber placeholder='' />
          </FormItem>
          <FormItem label="邮箱" field="email" rules={[{ required: false }]}>
            <Input placeholder=""  />
          </FormItem>
          <FormItem label="微信" field="wecom" rules={[{ required: true }]}>
            <Input placeholder=""  />
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}

export default EditMember;