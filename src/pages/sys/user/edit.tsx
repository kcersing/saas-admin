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

function Edit({ props }) {
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
          initialValues={{ name: props.name,mobile: props.mobile,email: props.email,gender: props.gender ,avatar:{ "name": props.avatar.gender, "path": props.avatar.path, "url": props.avatar.url} }}
        >

          <Form.Item
            label='头像'
            field='files'
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
          <FormItem label="手机号" field="mobile" rules={[{ required: true }]}>
            <Input placeholder=""  />
          </FormItem>
          <FormItem label="姓名" field="name" rules={[{ required: true }]}>
            <Input placeholder=""  />
          </FormItem>
          <FormItem label="性别" field="gender" rules={[{ required: false }]}>
            <Select options={['男', '女', '保密']} />
          </FormItem>

          <FormItem label="生日" field="birthday" rules={[{ required: false }]}>
            <DatePicker  placeholder=""  />
          </FormItem>

          <FormItem label='年龄' field='age' rules={[{ type: 'number',required: false}]}>
            <InputNumber placeholder='' />
          </FormItem>
          <FormItem label="邮箱" field="email" rules={[{ required: false }]}>
            <Input placeholder=""  />
          </FormItem>
          <FormItem label="微信" field="wecom" rules={[{ required: false }]}>
            <Input placeholder=""  />
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}

export default Edit;