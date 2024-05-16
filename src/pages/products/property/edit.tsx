import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Select } from '@arco-design/web-react';
import productService from '../../../api/product';
import SelectVenueList from '@/pages/components/select/selectVenueList';
import sysService from '../../../api/sys';

const FormItem = Form.Item;

function Edit({ props }) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [propertyType, setPropertyType] = useState([]);

  useEffect(() => {

    const ve = [];
    props.venue.map((v) => (
      ve.push(v.id)
    ));
    setVenues(ve);
    propertyTypeData();
  }, []);

  function propertyTypeData() {
    sysService.propertyType()
      .then((res) => {
        setPropertyType(res.data);
      });
  }

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
  const Option = Select.Option;

  const [typeDisabled, setTypeDisabled] = useState(true);

  function types(value) {
    if (value === 1) {
      setTypeDisabled(true);
    }
    if (value === 2) {
      setTypeDisabled(false);
    }
    if (value === 3) {
      setTypeDisabled(false);
    }
  }

  const [venues, setVenues] = useState([]);

  console.log(venues);


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
          <FormItem label="类型" field="type" rules={[{ required: false }]}>
            <Select
              disabled
              onChange={(value) => types(value)}
            >
              {propertyType.map((option) => (
                <Option key={option.id} value={option.id}>
                  {option.title}
                </Option>
              ))}
            </Select>
          </FormItem>

          <FormItem label="名称" field="name" rules={[{ required: true }]}>
            <Input placeholder="" />
          </FormItem>
          <FormItem label="总时长" field="duration" rules={[{ required: false }]}>
            <Input disabled={!typeDisabled} placeholder="" />
          </FormItem>
          <FormItem label="单次时长" field="length" rules={[{ required: false }]}>
            <Input disabled={typeDisabled} placeholder="" />
          </FormItem>
          <FormItem label="次数" field="count" rules={[{ required: false }]}>
            <Input placeholder="" />
          </FormItem>
          <FormItem label="定价" field="price" rules={[{ required: false }]}>
            <Input placeholder="" />
          </FormItem>
          <SelectVenueList mode='multiple'/>
        </Form>
      </Modal>
    </div>
  );
}

export default Edit;