import { useState } from 'react';
import { Modal, Button, Form, Input } from '@arco-design/web-react';
import SelectVenueList from '@/pages/components/select/selectVenueList';
import venueService from '@/api/venue';
const FormItem = Form.Item;

function Create( props: { Reload: (arg0: boolean) => void; }) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  function onOk() {
    form.validate().then((res) => {
      const params = {
        name: res.name,
        venueId: res.venue
      };
      console.log(params);
      setConfirmLoading(true);
      venueService.placeCreate(params)
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

          <SelectVenueList mode={""} />

          <FormItem label="场地名" field="name" rules={[{ required: true }]}>
            <Input placeholder="" style={{ width: 200, }} />
          </FormItem>


        </Form>
      </Modal>
    </div>
  );
}

export default  Create;