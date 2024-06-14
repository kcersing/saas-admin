import React, { useState, useEffect, useMemo, useContext } from 'react';
import {
  Form,
  Input,
  Modal,
} from '@arco-design/web-react';

import scheduleService from '@/api/schedule';

import SelectMemberList from '@/pages/components/select/selectMemberList';

const TextArea = Input.TextArea;

const FormItem = Form.Item;

function Subscribe(props) {

  console.log(props)

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  function onOk() {
    form.validate().then((res) => {
      const params = {
        subscribe: props.schedule.id,
        member: res.member,
        remark:res.remark,
      };

      scheduleService.scheduleMemberSubscribe(params)
        .then((res) => {
          console.log(res);
          props.SubscribeVisible(false)
          setConfirmLoading(false);
          props.Reload(true)
        })
        .catch((err) => {
          console.log(err);
          props.SubscribeVisible(false)
          setConfirmLoading(false);
        });
    });
  }

  const formItemLayout = {
    labelCol: {
      span: 4
    },
    wrapperCol: {
      span: 20
    }
  };

  return (
    <>
      <Modal
        focusLock={true}
        title="会员预约"
        onOk={onOk}
        confirmLoading={confirmLoading}
        visible={props.subscribeVisible}
        onCancel={() => {props.SubscribeVisible(false)}  }
      >
        <Form
          {...formItemLayout}
          form={form}
          labelCol={{
            style: { flexBasis: 90 }
          }}
          wrapperCol={{
            style: { flexBasis: 'calc(100% - 90px)' }
          }}
        >
          <SelectMemberList mode="multiple" />
          <FormItem label="备注" field="remark" rules={[{ required: false }]}>
            <TextArea  style={{ minHeight: 64, width: 350 }} />
          </FormItem>
        </Form>
      </Modal>
    </>
  );
}

export default Subscribe;