import React, { useRef, useState, useEffect } from 'react';
import { Form, Input, Select, Typography, Button, Space, Grid, Tooltip, Message } from '@arco-design/web-react';
import MemberDetails from '@/pages/components/member/memberDetails';
import * as fs from 'node:fs';


function MemberSearch() {

  const [values, setValues] = useState({});


  const formRef = useRef();
  const [visible, setVisible] = useState(false);
  const [member, setMember] = useState({value:'',option:''});

  useEffect(() => {

  }, [visible]);


  const Visible = (v) => {
    setVisible(v);
  };
  return (
    <>
      <Form
        ref={formRef} style={{ maxWidth: 650, margin: 'auto' }}
        autoComplete="off"
        onValuesChange={(_, v) => setValues(v)}
        initialValues={{ members: { select: '手机号' } }}
        onSubmit={(v) => {
          setVisible(true);
          setMember({ option: v.memberOption[0], value: v.memberValue });
        }}
      >
        <Space>

          <Form.Item initialValue={['手机号']} field="memberOption" style={{ marginBottom: 0 }} rules={[{ required: true }]}>
            <Select
              style={{ width: 100, marginRight: 0 }}
              options={['id', '手机号', '卡号']}
            />
          </Form.Item>

          <Form.Item field="memberValue" style={{ marginBottom: 0 }} rules={[{ required: true }]}>
            <Input style={{ width: 450, height: 36, marginBottom: 0 }} />
          </Form.Item>

          <Button type="primary"
                  htmlType="submit"
                  style={{ height: 36 }}>
            搜索
          </Button>
        </Space>
      </Form>
      <MemberDetails Visible={Visible} visibles={visible} memberValue={member.value} memberOption={member.option} />
    </>
  );
}

export default MemberSearch;
