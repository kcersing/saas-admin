import React, { useState } from 'react';
import { Modal, Button, Form, Input, Select, Message, Upload, DatePicker, InputNumber } from '@arco-design/web-react';
import SelectRoleList from '@/pages/components/select/selectRoleList';
import userService from '@/api/user';

function Role({ props }) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  function onOk() {
    form.validate().then((res) => {
      console.log(res)
      setConfirmLoading(true);
      const params={
        id:props.id,
        role_id:res.role,
      }
      userService.setRole(params)
        .then((res) => {
          console.log(res)
          Message.success(res.message);
          setVisible(false);
          setConfirmLoading(false);
        })
        .catch((err) => {
          Message.error(err);
          setVisible(false);
          setConfirmLoading(false);
        });
      props.Reload(true);
    })
      .catch((err) => {
        console.log(err);
        setVisible(false);
        setConfirmLoading(false);
      })

  }

  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };

  console.log(props)

  return (
    <div>
      <Button onClick={() => setVisible(true)}  size='mini'>
        设置角色
      </Button>

      <Modal
        focusLock={true}
        title='设置角色'
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
          initialValues={{role:props.roleID}}
        >
          <SelectRoleList />
        </Form>
      </Modal>
    </div>
  );
}

export default Role;