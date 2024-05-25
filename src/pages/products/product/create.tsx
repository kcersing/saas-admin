import React, {useRef, useState, useEffect, useMemo,useContext } from 'react';

import { Button, Form, Input, Message, Modal, InputNumber, Card } from '@arco-design/web-react';
import PropertysRadio from '@/pages/components/propertys/radio';
import PropertysMultiple from '@/pages/components/propertys/multiple';


const TextArea = Input.TextArea;

const FormItem = Form.Item;
function Create() {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const formRef = useRef();

  function onOk() {
    form.validate().then((res) => {
      const params = {
        price:res.price,
        name:res.name,
        stock:res.stock,
        cardProperty:res.cardProperty,
        classProperty:res.classProperty,
        courseProperty:res.courseProperty,
      }
      console.log(params)
      // setConfirmLoading(true);
      //
      // productService.productCreate(params)
      //   .then((res) => {
      //     console.log(res);
      //     setVisible(false);
      //     setConfirmLoading(false);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
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

  const [values, setValues] = useState({});
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
          ref={formRef}
          autoComplete='off'
          onValuesChange={(_, v) => setValues(v)
        }
        >

          <FormItem label="名称" field="name" rules={[{ required: true }]}>
            <Input placeholder="" />
          </FormItem>

          <Card>
            <PropertysRadio label="卡属性" field="cardProperty" type="card"  form={form} />
            <PropertysMultiple  label="私教课" field="courseProperty" type="course" form={form}/>
            <PropertysMultiple label="团课" field="classProperty" type="class" form={form}/>
          </Card>

          <FormItem shouldUpdate noStyle>

            {(values) => {
              let moneys=0
              if( values.courseProperty!== undefined ){
                if( values.courseProperty.length > 0 ){
                  if( values.courseProperty[0]!==undefined ){
                    values.courseProperty.map((item,index)=>{
                      if(item!==undefined){
                        if(item.hasOwnProperty("money") && item.hasOwnProperty("property")&& item.hasOwnProperty("quantity")){
                          moneys +=item.money * item.quantity;
                        }
                      }
                    })
                  }
                }
              }
              if( values.classProperty!== undefined ){
                if( values.classProperty.length > 0 ){
                  if( values.classProperty[0]!==undefined ){
                    values.classProperty.map((item,index)=>{
                      if(item!==undefined){
                        if(item.hasOwnProperty("money") && item.hasOwnProperty("property")&& item.hasOwnProperty("quantity")){
                          moneys +=item.money * item.quantity;
                        }
                      }
                    })
                  }
                }
              }
              // if( values.classProperty!="undefined" && values.classProperty.length>0 && values.courseProperty[0]!="undefined" ){
              //
              //   console.log(values.classProperty[0].hasOwnProperty("money"))
              // }



              console.log(moneys)
              return <></>;
            }}
          </FormItem>




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
            <TextArea placeholder="说明..." style={{ minHeight: 64, width: 350 }} />
          </FormItem>


        </Form>
      </Modal>
    </>
  );
}

export default Create;