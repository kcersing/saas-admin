import { useState } from 'react';
import { Modal, Button, Form, Input } from '@arco-design/web-react';
import venueService from '@/api/venue';


const TextArea = Input.TextArea;
const FormItem = Form.Item;

function Create(props: { Reload: (arg0: boolean) => void; }) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  
  function onOk() {
    form.validate().then((res) => {
      const params = {
        name:res.name,
        address:res.address,
        address_detail:res.address_detail,
        latitude:res.latitude,
        longitude:res.longitude,
        mobile:res.mobile,
        information:res.information,
      }
      setConfirmLoading(true);
      venueService.venueCreate(params)
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
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };
  return (
    <div>
      <Button onClick={() => setVisible(true)} type='primary'>
        约课
      </Button>
      <Modal
        title='约课'
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

          <FormItem label="名称" field="name" rules={[{ required: true }]}>
            <Input placeholder=""  />
          </FormItem>

          <FormItem label="地址" field="address" rules={[{ required: false }]}>
            <Input placeholder=""  />
          </FormItem>
          <FormItem label="详细地址" field="address_detail" rules={[{ required: false }]}>
            <Input placeholder=""  />
          </FormItem>
          <FormItem label="纬度" field="latitude" rules={[{ required: false }]}>
            <Input placeholder=""  />
          </FormItem>
          <FormItem label="经度" field="longitude" rules={[{ required: false }]}>
            <Input placeholder=""  />
          </FormItem>
          <FormItem label="手机号" field="mobile" rules={[{ required: true }]}>
            <Input placeholder=""  />
          </FormItem>

          <FormItem label="介绍" field="information" rules={[{ required: false }]}>
          <TextArea placeholder='介绍...' style={{ minHeight: 64, width: 350 }} />
        </FormItem>











        </Form>
      </Modal>
    </div>
  );
}

export default  Create;