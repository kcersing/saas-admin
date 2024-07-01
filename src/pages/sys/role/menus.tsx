import React, { useEffect, useState } from 'react';
import { Modal, Button, Space,Typography, Badge ,TreeSelect, Radio, Form, Input, Select, Message, Upload, DatePicker, InputNumber } from '@arco-design/web-react';
import memuService from '@/api/menu';
import venueService from '@/api/venue';


const FormItem = Form.Item;

function Memus({props}) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const [treeData, setTreeData] = useState([]);

  function getTreeData() {
    memuService.getMenuTree()
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
        menu_ids: res.menus,
        role_id: props.id,
      }

      memuService.setAuthMenu(params)
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
      <Button onClick={() => setVisible(true)}  size='mini'>设置菜单</Button>

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
            style: { flexBasis: 60 },
          }}
          wrapperCol={{
            style: { flexBasis: 'calc(90% - 60px)' },
          }}
          initialValues={{menus:props.menus}}
        >
          <FormItem label="菜单" title="menus" field='menus' rules={[{ required: true, message: '请选择菜单' }]}>
            <TreeSelect
              showSearch
              allowClear
              treeCheckable
              treeData={treeData}
              maxTagCount={10}
              treeCheckedStrategy={TreeSelect.SHOW_ALL}
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

export default Memus;