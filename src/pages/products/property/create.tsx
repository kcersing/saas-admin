import React, { useState, useEffect, useMemo, useContext } from 'react';
import { Button, Form, Input, Message, Modal, Select, InputNumber } from '@arco-design/web-react';
import sysService from '@/api/sys';
import SelectVenueList from '@/pages/components/select/selectVenueList';
import productService from '@/api/product';
import SelectPropertyType from '@/pages/components/select/selectPropertyType';


// ======================================

const FormItem = Form.Item;

function Create(props: { Reload: (arg0: boolean) => void; }) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  // useEffect(() => {}, []);

  function onOk() {
    form.validate().then((res) => {
      const params = {
        type: res.type,
        price: res.price,
        duration: res.duration,
        length: res.length,
        count: res.count,
        name: res.name,
        venueId: res.venue
      };
      console.log(params);
      setConfirmLoading(true);
      productService.propertyCreate(params)
        .then((res) => {
          console.log(res);
          setVisible(false);
          setConfirmLoading(false);
          props.Reload(true)
        })
        .catch((err) => {
          console.log(err);
          setVisible(false);
          setConfirmLoading(false);
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
        focusLock={true}
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

          <SelectPropertyType />

          <FormItem label="名称" field="name" rules={[{ required: true }]}>
            <Input placeholder="" />
          </FormItem>

          <Form.Item shouldUpdate noStyle>
            {(values) => {
              return values.type === 'card' ? (
                <>
                  <FormItem label="总时长" field="duration" rules={[{ required: false }]}>
                    <InputNumber placeholder="" />
                  </FormItem>
                  <FormItem label="次数" field="count" rules={[{ required: false }]}>
                    <InputNumber placeholder="" />
                  </FormItem>
                </>
              ) : (
                (values.type === 'course' || values.type === 'class') && (
                  <FormItem label="单次时长" field="length" rules={[{ required: false }]}>
                    <InputNumber placeholder="" />
                  </FormItem>
                )
              );
            }}
          </Form.Item>
          <FormItem label="定价" field="price" rules={[{ required: false }]}>
            <InputNumber
              placeholder=""
              step={0.01}
              precision={1} />
          </FormItem>
          <SelectVenueList mode="multiple" />

        </Form>
      </Modal>
    </>
  );
}

export default Create;