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
       "avatar":"",
       "mobile":res.mobile,
       "email":res.email,
       "status":res.status,
       "name":res.name,
       "age":res.age,
       "gender":res.gender,
       "wecom":res.wecom,
       "birthday":res.birthday,
      }
      console.log(params);
      if (res.files !== undefined){
        params.avatar = res.files[0].response.data.path
      }





      // memberService.memberUpdate(params).then(
      //
      //
      // ).catch(
      //
      // )

 

      // setConfirmLoading(true);
      // setTimeout(() => {
      //   Message.success('Success !');
      //   setVisible(false);
      //   setConfirmLoading(false);
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
          initialValues={{ name: props.name,mobile: props.mobile} }
        >
          <FormItem label="名称" field="name" rules={[{ required: true }]}>
            <Input placeholder=""  />
          </FormItem>
          <FormItem label="联系人手机号" field="mobile" rules={[{ required: true }]}>
            <Input placeholder=""  />
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}

export default EditMember;