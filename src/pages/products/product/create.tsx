import React, { useState, useEffect, useMemo,useContext } from 'react';
import { Button, Form, Input, Message, Modal ,InputNumber} from '@arco-design/web-react';
import sysService from '@/api/sys';
import productService, { productCreate } from '@/api/product';
import SelectPropertyList from '@/pages/components/select/selectPropertyList';
const TextArea = Input.TextArea;
const FormItem = Form.Item;

function Create() {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();


  function onOk() {
    form.validate().then((res) => {
      const params = {
        price:res.price,
        name:res.name,
        stock:res.stock,
        cardProperty:res.cardProperty,
        classProperty:res.classProperty,
        courseProperty:res.courseProperty,
        createId:0,
      }
      setConfirmLoading(true);
      productService.productCreate(params)
        .then((res) => {
          console.log(res);
          setVisible(false);
          setConfirmLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
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
    <>
      <Button onClick={() => setVisible(true)} type="primary">新建</Button>
      <Modal
        title="新建"
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
        >

          <FormItem label="名称" field="name" rules={[{ required: true }]}>
            <Input placeholder="" />
          </FormItem>

          <SelectPropertyList mode='' label="卡属性" field='cardProperty' type='card'/>
          <SelectPropertyList mode='multiple' label="课属性" field='courseProperty' type='course'/>
          <SelectPropertyList mode='multiple' label="团课属性" field='classProperty' type='class'/>

          <FormItem label="定价" field="price" rules={[{ required: false }]}>
            <InputNumber
              placeholder=""
              step={0.01}
              precision={1} />
          </FormItem>

          <FormItem label="库存" field="stock" rules={[{ required: false }]}>
            <InputNumber
              placeholder=""
              precision={1} />
          </FormItem>
          <FormItem label="说明" field="description" rules={[{ required: false }]}>
          <TextArea placeholder='说明...' style={{ minHeight: 64, width: 350 }} />
          </FormItem>
        </Form>
      </Modal>
    </>
  );
}

export default Create;