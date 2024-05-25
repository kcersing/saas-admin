import { Form, Input, InputNumber, Select } from '@arco-design/web-react';
import React from 'react';

<Form.Item noStyle>



  <Form.Item
    label="支付方式"
    field="pays.pay_type"
    rules={[{ required: true }]}>
    <Select placeholder='请选择支付方式' style={{ width: 154 }} allowClear>
      {payType.map((option, index) => (
        <Option key={option}  value={option}>
          {option}
        </Option>
      ))}
    </Select>
  </Form.Item>


  <Form.Item
    label="实付金额"
    field="pays.pay"
    rules={[{ required: true }]}>
    <InputNumber
      placeholder=""
      step={0.01}
      precision={1} />
  </Form.Item>
  <Form.Item
    label="减免金额"
    field="pays.remission"
    rules={[{ required: true }]}>
    <InputNumber
      placeholder=""
      step={0.01}
      precision={1} />
  </Form.Item>




  <Form.Item
    label='备注'
    required
    field="pays.note"
    rules={[
      {
        required: true,
        message: '请输入备注信息',
      },
    ]}
  >
    <Input
      placeholder='请输入备注信息'
    />
  </Form.Item>


</Form.Item>