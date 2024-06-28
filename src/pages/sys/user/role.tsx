import React, { useState } from 'react';
import { Modal, Button, Form, Input, Select, Message, Upload, DatePicker, InputNumber } from '@arco-design/web-react';
import memberService from '@/api/member';


const FormItem = Form.Item;

function Role(props) {
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


  const Option = Select.Option;
  const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Disabled'];
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
        >

          <FormItem  label="角色" title="role" field='role' rules={[{ required: true, message: '请选择角色' }]}>
            <Select placeholder='请选择角色' style={{ width: 154 }} allowClear>
              {options.map((option, index) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </FormItem>





        </Form>
      </Modal>
    </div>
  );
}

export default Role;