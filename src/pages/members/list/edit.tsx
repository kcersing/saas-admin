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
import memberService, { memberUpdate } from '@/api/member';
import dayjs from 'dayjs';

const FormItem = Form.Item;
function Edit({props}) {
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

      setConfirmLoading(true);
      memberService.memberUpdate(params)
        .then((res) => {
          console.log(res);
          setVisible(false);
          setConfirmLoading(false);
          props.Reload(true)
        })
        .catch((err) => {
          setVisible(false);
          setConfirmLoading(false);
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
            nickname: props.nickname,
            mobile: props.mobile,
            email: props.email,
            gender: props.gender ,
            avatar:{ "name": props.avatar.nickname, "path": props.avatar.path, "url": props.avatar.url},
            birthday:dayjs(props.birthday, 'HH:mm'),
        }}
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
          <FormItem label="姓名" field="nickname" rules={[{ required: true }]}>
            <Input placeholder=""  />
          </FormItem>
          <FormItem label="性别" field="gender" rules={[{ required: false }]}>
            <Select options={['女性', '男性', '保密']} />
          </FormItem>
          <FormItem label="生日" field="birthday" rules={[{ required: false }]}>
            <DatePicker  placeholder=""  />
          </FormItem>
          <FormItem label="邮箱" field="email" rules={[{ required: false }]}>
            <Input placeholder=""  />
          </FormItem>
          <FormItem label="微信" field="wecom" rules={[{ required: false }]}>
            <Input placeholder=""  />
          </FormItem>


        </Form>
      </Modal>
    </>
  );
}

export default Edit;