import React, { useState } from 'react';
import {
  Modal,
  Button,
  Form,
  Input,
  Select,
  Message,
  Upload,
  DatePicker,
  InputNumber,
  TreeSelect
} from '@arco-design/web-react';
import memberService from '@/api/member';

const treeData = [
  {
    title: 'Trunk 0-0',
    value: 'Trunk 0-0',
    key: '0-0',
    children: [
      {
        title: 'Leaf 0-0-1',
        value: 'Leaf 0-0-1',
        key: '0-0-1',
      },
      {
        title: 'Branch 0-0-2',
        value: 'Branch 0-0-2',
        key: '0-0-2',
        children: [
          {
            title: 'Leaf 0-0-2-1',
            value: 'Leaf 0-0-2-1',
            key: '0-0-2-1',
          },
        ],
      },
    ],
  },
  {
    title: 'Trunk 0-1',
    value: 'Trunk 0-1',
    key: '0-1',
    children: [
      {
        title: 'Branch 0-1-1',
        value: 'Branch 0-1-1',
        key: '0-1-1',
        checkable: false,
        children: [
          {
            title: 'Leaf 0-1-1-1',
            value: 'Leaf 0-1-1-1',
            key: '0-1-1-1',
          },
          {
            title: 'Leaf 0-1-1-2',
            value: 'Leaf 0-1-1-2',
            key: '0-1-1-2',
            disabled: true,
          },
        ],
      },
      {
        title: 'Leaf 0-1-2',
        value: 'Leaf 0-1-2',
        key: '0-1-2',
      },
    ],
  },
];
const FormItem = Form.Item;

function Menus(props) {
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
  const [value, setValue] = useState(['0-0']);


  return (
    <div>
      <Button onClick={() => setVisible(true)}  size='mini'>
        设置菜单
      </Button>

      <Modal
        focusLock={true}
        title='设置菜单'
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

          <FormItem  label="菜单" title="role" field='menus' rules={[{ required: true, message: '请选择菜单' }]}>
            <TreeSelect
              showSearch
              allowClear
              treeCheckable
              treeData={treeData}
              treeCheckedStrategy={TreeSelect.SHOW_ALL}
              onChange={(value) => {
                console.log(value);
                setValue(value);
              }}
              style={{ width: 300, }}
            />




          </FormItem>





        </Form>
      </Modal>
    </div>
  );
}

export default Menus;