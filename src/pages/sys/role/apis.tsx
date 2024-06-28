import React, { useEffect, useState } from 'react';
import { Modal, Button, Space,Typography, Badge ,TreeSelect, Radio, Form, Input, Select, Message, Upload, DatePicker, InputNumber } from '@arco-design/web-react';
import roleService from '@/api/role';


const tata = [
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

function Apis(props) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();


  const [treeData, setTreeData] = useState([]);
  function getTreeData() {

    roleService.apiList({})
      .then((res) => {

        setTreeData(tata)

      });
  }


  useEffect(() => {
    getTreeData();
  }, []);





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

  const [value, setValue] = useState(['0-0']);

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
      <Button onClick={() => setVisible(true)}  size='mini'>
        设置API
      </Button>

      <Modal
        focusLock={true}
        title='设置API'
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

          <FormItem initialValue={value} label="API" title="role" field='role' rules={[{ required: true, message: '请选择API' }]}>

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

export default Apis;