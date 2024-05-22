import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Modal, Select } from '@arco-design/web-react';
import productService, { productEdit } from '@/api/product';
import SelectVenueList from '@/pages/components/select/selectVenueList';
import sysService from '@/api/sys';
import SelectPropertyList from '@/pages/components/select/selectPropertyList';

const FormItem = Form.Item;
const TextArea = Input.TextArea;
function Edit({ props }) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  // useEffect(() => {
  //
  // }, []);


  function onOk() {
    form.validate().then((res) => {

      const params = {
        id: props.id,
        price:res.price,
        name:res.name,
        stock:res.stock,
        cardProperty:res.cardProperty,
        classProperty:res.classProperty,
        courseProperty:res.courseProperty,
      };

      setConfirmLoading(true);
      productService.productEdit(params)
        .then((res) => {
          console.log(res);
          setVisible(false);
          setConfirmLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });


      // setTimeout(() => {
      //   Message.success('Success !');
      //
      // }, 1500);
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
        title="编辑"
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
          initialValues={{
            price: props.price,
            name: props.name,
            stock:props.stock,
            cardProperty:props.cardProperty,
            classProperty:props.classProperty,
            courseProperty:props.courseProperty,
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
            <InputNumber />
          </FormItem>
          <FormItem label="说明" field="description" rules={[{ required: false }]}>
            <TextArea placeholder='说明...' style={{ minHeight: 64, width: 350 }} />
          </FormItem>



        </Form>
      </Modal>
    </div>
  );
}

export default Edit;