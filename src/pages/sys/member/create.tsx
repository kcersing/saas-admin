import { useState } from 'react';
import { Modal, Button, Form, Input, Select, Message } from '@arco-design/web-react';
const FormItem = Form.Item;

function CreateMember() {
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
      <Button onClick={() => setVisible(true)} type='primary'>
        新建
      </Button>
      <Modal
        title='新建会员'
        visible={visible}
        onOk={onOk}
        confirmLoading={confirmLoading}
        onCancel={() => setVisible(false)}
      >
        <Form
          {...formItemLayout}
          form={form}
          labelCol={{
            style: { flexBasis: 90 },
          }}
          wrapperCol={{
            style: { flexBasis: 'calc(100% - 90px)' },
          }}
        >
          <FormItem label='姓名' field='name' rules={[{ required: true }]}>
            <Input placeholder='' />
          </FormItem>
          <FormItem label='性别' required field='gender' rules={[{ required: false }]}>
            <Select options={['男', '女','保密']} />
          </FormItem>
          <FormItem label='手机号' field='mobile' rules={[{ required: true }]}>
            <Input placeholder='' />
          </FormItem>
          <FormItem label='邮箱' field='email' rules={[{ required: false }]}>
            <Input placeholder='' />
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}

export default  CreateMember;