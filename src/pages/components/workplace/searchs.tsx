import React, { useRef, useState, useEffect } from 'react';
import { Form, Input, Select, Typography, Button, Space, Grid, Tooltip, Message } from '@arco-design/web-react';

function CustomInput(props) {
  const value = props.value || {};

  const handleChange = (newValue) => {
    props.onChange && props.onChange(newValue);
  };

  return (
    <Input
      style={{width: 600,height:36,marginBottom:0}}
      value={value.input}
      onChange={(v) => {
        handleChange({ ...value, input: v });
      }}
      addBefore={
        <Select
          error={props.error}
          style={{ width: 100, marginRight: 0 }}
          defaultValue={['手机号']}
          value={value.select}
          options={['id', '手机号','卡号']}
          onChange={(v) => {
            handleChange({ ...value, select: v });
          }}
        />
      }
    />
  );
}

function Searchs() {
  const [values, setValues] = useState({});
  useEffect(() => {
    console.log("1")
  }, []);

  const formRef = useRef();

  return (
<>

  <Form
    onSubmit={(v) => {
    console.log(v);

      Message.info({
        content: (
          <span>
          You clicked <b>{v.members.input}</b>
        </span>
        ),
      });

  }}
   ref={formRef} style={{ maxWidth: 650 ,margin:'auto'}}
    autoComplete='off'
    onValuesChange={(_, v) => setValues(v)}
    initialValues={{ members: { select: "手机号" }}}
  >

    <Space>
        <Form.Item field='members' style={{marginBottom:0}}>
          <CustomInput />
        </Form.Item>
          <Button type='primary' htmlType='submit' style={{height:36}}>
            搜索
          </Button>
        </Space>


  </Form>
</>

  );
}

export default Searchs;
