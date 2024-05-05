import { useState } from 'react';
import { Modal, Button, Form, Input, Select, Message, Upload, DatePicker, InputNumber } from '@arco-design/web-react';
import productService from '@/api/product';

const FormItem = Form.Item;

function CreateProperty() {
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

  const Option = Select.Option;
const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Wuhan'];
  return (
    <>
      <Button onClick={() => setVisible(true)} type='primary'>新建</Button>
      <Modal
        title='新建属性'
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

          <FormItem label="类型" field="type" rules={[{ required: false }]}>
            <Select options={['男', '女', '保密']} />
          </FormItem>
    
          <FormItem label="名称" field="name" rules={[{ required: true }]}>
            <Input placeholder=""  />
          </FormItem>
          <FormItem label="总时长" field="duration" rules={[{ required: false }]}>
          <Input placeholder=""  />
          </FormItem>
          <FormItem label="单次时长" field="length" rules={[{ required: false }]}>
            <Input placeholder=""  />
          </FormItem>
          <FormItem label="次数" field="count" rules={[{ required: false }]}>
            <Input placeholder=""  />
          </FormItem>
          <FormItem label="定价" field="price" rules={[{ required: false }]}>
            <Input placeholder=""  />
          </FormItem>

          <FormItem label="场馆" field="venue" rules={[{ required: false }]}>
          <Select
            mode='multiple'
            placeholder='Please select'
            style={{ width: 345 }}
            defaultValue={['Beijing', 'Shenzhen']}
            allowClear
          >
        {options.map((option) => (-+
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
      </Select>
          </FormItem>





        </Form>
      </Modal>
    </>
  );
}

export default CreateProperty;