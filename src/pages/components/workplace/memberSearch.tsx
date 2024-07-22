import React, { useRef, useState, useEffect } from 'react';
import { Form, Input, Select, Typography, Button, Space, Grid, Tooltip, Message } from '@arco-design/web-react';
import Info from '@/pages/components/member/info';
import * as fs from 'node:fs';
import memberService from '@/api/member';


function MemberSearch() {

  const [values, setValues] = useState({});

  const [form] = Form.useForm();
  const formRef = useRef();
  const [visible, setVisible] = useState(false);
  const [member, setMember] = useState({value:'',option:''});

  useEffect(() => {

  }, [visible]);



  const Visible = (v) => {
    setVisible(v);
  };

  function onOk() {
    form.validate().then((res) => {
      setMember({ option: res.memberOption, value: res.memberValue });
      setVisible(true);
    })
      .catch((err) => {
        setVisible(false);
      });
  }
  return (
    <>
      <Form
        ref={formRef}
        form={form}
        style={{ maxWidth: 650, margin: 'auto' }}
        autoComplete="off"
        onValuesChange={(_, v) => setValues(v)}
        initialValues={{ members: { select: '手机号' } }}
        onSubmit={ onOk}
      >
        <Space>

          <Form.Item initialValue={'1'} field="memberOption" style={{ marginBottom: 0 }} rules={[{ required: true }]}>
            <Select
              style={{ width: 120, marginRight: 0 }}
              options=
             {[
                 {value: '1',label: '会员账号ID'},
                 {value: '2',label: '手机号'},
                 // {value: '3',label: '商品编号'},
                 // {value: '4',label: '属性编号'},
            ]}
            />
          </Form.Item>

          <Form.Item field="memberValue" style={{ marginBottom: 0 }} rules={[{ required: true }]}>
            <Input.Search style={{ width: 450, height: 36, marginBottom: 0 }} />
          </Form.Item>

          <Button type="primary"
                  htmlType="submit"
                  style={{ height: 36 }}>
            搜索
          </Button>
        </Space>
      </Form>
      {visible?<Info Visible={Visible} visibles={visible} memberValue={member.value} memberOption={member.option[0]} />:null}
    </>
  );
}

export default MemberSearch;
