import React, { useState } from 'react';
import { Modal, Button, Form, Input, Select, Message, Upload, DatePicker, InputNumber } from '@arco-design/web-react';
import memberService from '@/api/member';


const FormItem = Form.Item;

function FaceCreate(props) {
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
  return (
    <div>
      <Button onClick={() => setVisible(true)}  size='mini'>
        设置人脸
      </Button>

      <Modal
        focusLock={true}
        title='设置'
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


          <FormItem label="身份证证件号" field="identity_card" rules={[{ required: true }]}>
            <Input placeholder=""  />
          </FormItem>
          <Form.Item
            label='身份证正面'
            field='face_identity_card'
            triggerPropName='fileList'
          >
            <Upload
              listType='picture-card'
              multiple
              name='files'
              action='/api/pub/upload'
              limit={1}
              onPreview={(file) => {
                Modal.info({
                  title: 'Preview',
                  content: (
                    <img
                      src={file.url || URL.createObjectURL(file.originFile)}
                      style={{
                        maxWidth: '100%',
                      }}
                    ></img>
                  ),
                });
              }}
            />
          </Form.Item>
          <Form.Item
            label='身份证反面'
            field='files'
            triggerPropName='fileList'
          >
            <Upload
              listType='picture-card'
              multiple
              name='back_identity_card'
              action='/api/pub/upload'
              limit={1}
              onPreview={(file) => {
                Modal.info({
                  title: 'Preview',
                  content: (
                    <img
                      src={file.url || URL.createObjectURL(file.originFile)}
                      style={{
                        maxWidth: '100%',
                      }}
                    ></img>
                  ),
                });
              }}
            />
          </Form.Item>






        </Form>
      </Modal>
    </div>
  );
}

export default FaceCreate;