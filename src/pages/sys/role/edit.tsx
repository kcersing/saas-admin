import { useState } from 'react';
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

const FormItem = Form.Item;

function EditMember({ props }) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  function onOk() {
    form.validate().then((res) => {

     const params = {
        "id":props.id,
       "name":res.name,

      }
      console.log(params);



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
          initialValues={{ name: props.name}}
        >
          <FormItem label="角色名" field="name" rules={[{ required: true }]}>
            <Input placeholder=""  />
          </FormItem>
          <FormItem label="角色值" field="value" rules={[{ required: false }]}>
            <Input placeholder=""  />
          </FormItem>
          <FormItem label="备注" field="remark" rules={[{ required: false }]}>
            <Input placeholder=""  />
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}

export default EditMember;