
import { Modal, Button, Form, Input } from '@arco-design/web-react';
import contractService from '@/api/contract';
import EditorNode from '@/pages/components/bytemd';
const FormItem = Form.Item;
import React, { useMemo, useState } from 'react'
function Create() {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [contentData, setContentData] = useState(false);
  const ContentData = (content) => {
    setContentData(content)
  }

  function onOk() {
    form.validate().then((res) => {
      const params = {
        name: res.name,
        content: contentData
      };
      setConfirmLoading(true);
      contractService.contractCreate(params)
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
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };

  return (
    <>
      <Button onClick={() => setVisible(true)} type='primary'>
        新建
      </Button>
      <Modal
        focusLock={true}
        title='新建'
        style={{width: 1000}}
        visible={visible}
        onOk={onOk}
        confirmLoading={confirmLoading}
        onCancel={() => setVisible(false)}
      >
        <Form
          {...formItemLayout}
          form={form}
          labelCol={{
            style: { flexBasis: 90 },
          }}
          wrapperCol={{
            style: { flexBasis: 'calc(100% - 90px)' },
          }}
        >


          <FormItem label="合同名称" field="name" rules={[{ required: true }]}>
            <Input placeholder="" style={{ width: 200, }} />
          </FormItem>


          <EditorNode ContentData={ContentData} />


        </Form>
      </Modal>
    </>
  );
}

export default  Create;