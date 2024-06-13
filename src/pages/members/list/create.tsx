import { useState } from 'react';
import { Modal, Button, Form, Input, Select, Message, Upload, DatePicker, InputNumber } from '@arco-design/web-react';
import memberService from '@/api/member';


const FormItem = Form.Item;

function Create(props: { Reload: (arg0: boolean) => void; }) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  function onOk() {
    form.validate().then((res) => {
     let files="imagebucket/c.jpg";
      console.log(res.files)

      if(res.files !== undefined && res.files.length> 0 && res.files[0].response.code===0){
        if(res.files[0].response.code===0){
          if(res.files[0].response.data.path==="imagebucket/"){
            files = "imagebucket/c.jpg";
          }else {
            files = res.files[0].response.data.name
          }
        }
      }

      const params = {
        avatar:files,
        mobile:res.mobile,
        email:res.email,
        nickname:res.name,
        name:res.name,
        wecom:res.wecom,
        gender:res.gender,
        birthday:res.birthday,
      }
      setConfirmLoading(true);
      memberService.memberCreate(params)
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
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };
  return (
    <div>
      <Button onClick={() => setVisible(true)} type='primary'>
        新建
      </Button>
      <Modal
        focusLock={true}
        title='新建'
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
    </div>
  );
}

export default Create;