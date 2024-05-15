import React, { useState, useEffect, useMemo,useContext } from 'react';
import { Button, Form, Input, Message, Modal, Select ,InputNumber} from '@arco-design/web-react';
import sysService from '@/api/sys';
import SelectVenueList from '@/pages/components/selectVenueList';
import productService from '@/api/product';


// ======================================

const FormItem = Form.Item;

function CreateProperty() {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const [propertyType, setPropertyType] = useState([])

  useEffect(() => {
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
        type:res.type,
        price:res.price,
        duration:res.duration,
        length:res.length,
        count:res.count,
        name:res.name,
        venueId:res.venue
      }
      console.log(params);
      setConfirmLoading(true);
      productService.propertyCreate(params)
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

  const Option = Select.Option;

  const [typeDisabled, setTypeDisabled ] = useState(true)
  function types(value){
  if (value===1) {   setTypeDisabled(true)}
    if (value===2) {   setTypeDisabled(false)}
    if (value===3) {   setTypeDisabled(false)}
  }
  return (
    <>
      <Button onClick={() => setVisible(true)} type="primary">新建</Button>
      <Modal
        title="新建属性"
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
          <FormItem label="类型" field="type" rules={[{ required: false }]}>
            <Select
              onChange={(value) => types(value)}
            >
              {propertyType.map((option) => (
                <Option key={option.key} value={option.key}>
                  {option.title}
                </Option>
              ))}
            </Select>
          </FormItem>

          <FormItem label="名称" field="name" rules={[{ required: true }]}>
            <Input placeholder="" />
          </FormItem>
          <FormItem label="总时长" field="duration" rules={[{ required: false }]}>
            <InputNumber disabled={!typeDisabled}  placeholder="" />
          </FormItem>
          <FormItem label="单次时长"  field="length" rules={[{ required: false }]}>
            <InputNumber disabled={typeDisabled}  placeholder="" />
          </FormItem>
          <FormItem label="次数" field="count" rules={[{ required: false }]}>
            <InputNumber placeholder="" />
          </FormItem>
          <FormItem label="定价" field="price" rules={[{ required: false }]}>
            <InputNumber
              placeholder=""
              step={0.01}
              precision={1} />
          </FormItem>
          <SelectVenueList mode='multiple'/>
        </Form>
      </Modal>
    </>
  );
}

export default CreateProperty;