import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Modal, Select } from '@arco-design/web-react';
import productService from '../../../api/product';
import SelectVenueList from '@/pages/components/select/selectVenueList';
import sysService from '../../../api/sys';
import SelectPropertyType from '@/pages/components/select/selectPropertyType';

const FormItem = Form.Item;

function Edit({props}) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {

    const ve = [];
    props.venue.map((v) => (
      ve.push(v.id)
    ));
    setVenues(ve);

  }, []);


  function onOk() {
    form.validate().then((res) => {

      const params = {
        id: props.id,
        type: res.type,
        price: res.price,
        duration: res.duration,
        length: res.length,
        count: res.count,
        name: res.name,
        venueId: res.venue
      };

      setConfirmLoading(true);
      productService.propertyEdit(params)
        .then((res) => {
          console.log(res);
          setVisible(false);
          setConfirmLoading(false);

        })
        .catch((err) => {
          console.log(err);
          setVisible(false);
          setConfirmLoading(false);
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

  const [venues, setVenues] = useState([]);


  return (
    <>
      <Button style={{marginRight: 10}} onClick={() => setVisible(true)} >编辑</Button>
      <Modal
        focusLock={true}
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
            type: props.type,
            price: props.price,
            duration: props.duration,
            length: props.length,
            count: props.count,
            name: props.name,
            venue: venues
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
                  <FormItem label="天数" field="duration" rules={[{ required: false }]}>
                    <InputNumber  placeholder="" />
                  </FormItem>
                  <FormItem label="次数" field="count" rules={[{ required: false }]}>
                    <InputNumber placeholder="" />
                  </FormItem>
                </>
              ) : (
                (values.type === 'course' || values.type === 'class') && (
                  <FormItem label="单次时长" field="length" rules={[{ required: false }]}>
                    <InputNumber  placeholder="" />
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

export default Edit;