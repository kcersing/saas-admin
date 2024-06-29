import React, { useEffect, useState } from 'react';
import { Modal, Button, Space,Typography, Badge ,TreeSelect, Radio, Form, Input, Select, Message, Upload, DatePicker, InputNumber } from '@arco-design/web-react';
import roleService from '@/api/role';


const FormItem = Form.Item;

function Apis(props) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const [treeData, setTreeData] = useState([]);
  function getTreeData() {

    roleService.apiTree({})
      .then((res) => {
        console.log(res)
        setTreeData(res.data)
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

  const [value, setValue] = useState([]);

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
            style: { flexBasis: 60 },
          }}
          wrapperCol={{
            style: { flexBasis: 'calc(90% - 60px)' },
          }}
        >
          <FormItem label="API" title="role" field='role' rules={[{ required: true, message: '请选择API' }]}>

              <TreeSelect
                allowClear
                treeCheckable
                treeData={treeData}
                maxTagCount={10}
                treeCheckedStrategy={TreeSelect.SHOW_CHILD}
                onChange={(value) => {
                  console.log(value);
                  setValue(value);
                }}

                style={{ width: 380}}
                treeProps={{
                  height: 380,
                  renderTitle: (props) => {
                    return (
                      <span style={{ whiteSpace: 'nowrap', }} >
                        {props.title}
                      </span>
                    );
                  },
                  renderExtra: (props) => {
                    return props.key;
                }
                }}

              />

          </FormItem>

        </Form>
      </Modal>
    </div>
  );
}

export default Apis;