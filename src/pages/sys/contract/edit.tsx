import React, { useState } from 'react';
import {
  Modal,
  Button,
  Form,
  Input,
  Select,
  Message,
  Avatar,
  Upload,
  InputNumber,
  Progress,
  DatePicker
} from '@arco-design/web-react';
import memberService from '@/api/member';
import EditorNode from '@/pages/components/bytemd';
import contractService, { contractUpdate } from '@/api/contract';

const FormItem = Form.Item;

function Edit({props}) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [contentData, setContentData] = useState(props.content);
  const ContentData = (content) => {
    setContentData(content)
  }

  function onOk() {
    form.validate().then((res) => {

      const params = {
        id:res.id,
        name: res.name,
        content: contentData
      };
      setConfirmLoading(true);
      contractService.contractUpdate(params)
        .then((res) => {
          console.log(res);
          setVisible(false);
          setConfirmLoading(false);
          props.Reload(true);
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
    <div>
      <Button onClick={() => setVisible(true)} type="primary">编辑</Button>
      <Modal
        focusLock={true}
        title="编辑"
        visible={visible}
        onOk={onOk}
        confirmLoading={confirmLoading}
        onCancel={() => setVisible(false)}
        style={{width: 1000}}
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
          initialValues={{ name: props.name,content:props.content }}
        >

          <FormItem label="合同名称" field="name" rules={[{ required: true }]}>
            <Input placeholder="" style={{ width: 200, }} />
          </FormItem>

          <EditorNode ContentData={ContentData} Content={props.content}  />

        </Form>
      </Modal>
    </div>
  );
}

export default Edit;