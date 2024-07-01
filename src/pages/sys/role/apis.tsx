import React, { useEffect, useState } from 'react';
import { Modal, Button, Space,Typography, Badge ,TreeSelect, Radio, Form, Input, Select, Message, Upload, DatePicker, InputNumber } from '@arco-design/web-react';
import roleService, { setRoleApi } from '@/api/role';


const FormItem = Form.Item;

function Apis({props}) {
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

      setConfirmLoading(true);
      const params = {
        api_authority_info: res.apis,
        role_id: props.id,
      }

      console.log(params)
      setVisible(false);
      setConfirmLoading(false);
      return
      roleService.setRoleApi(params)
        .then((res) => {
          console.log(res)
          Message.success(res.message);
          setVisible(false);
          setConfirmLoading(false);
        })
        .catch((err) => {
          Message.error(err);
          setVisible(false);
          setConfirmLoading(false);
        });

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
          <FormItem label="API" title="apis" field='apis' rules={[{ required: true, message: '请选择API' }]}>
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
                }}

              />

          </FormItem>

        </Form>
      </Modal>
    </div>
  );
}

export default Apis;