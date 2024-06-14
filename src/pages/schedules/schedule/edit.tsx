import React, { useState, useEffect, useMemo, useContext } from 'react';
import {
  Button,
  Form,
  Input,
  Modal,
  TimePicker,
  InputNumber,
} from '@arco-design/web-react';
import SelectVenueList from '@/pages/components/select/selectVenueList';
import scheduleService from '@/api/schedule';
import SelectPropertyList from '@/pages/components/select/selectPropertyList';
import SelectStaffList from '@/pages/components/select/selectStaffList';
import SelectPlaceList from '@/pages/components/select/selectPlaceList';
import dayjs from 'dayjs';

const TextArea = Input.TextArea;

const FormItem = Form.Item;

function Edit({props}) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {

console.log(1)
  }, []);

  function onOk() {
    form.validate().then((res) => {
      console.log(res)

      const params = {
        type: "class",
        propertyId: res.classProperty,
        venueId: res.venue,
        placeId: res.place,
        num: res.num,
        startTime: props.date+" "+res.startTime,
        price: res.price,
        remark: res.remark,
        coachId: res.staff,
      };
      console.log(params);
      setConfirmLoading(true);
      scheduleService.scheduleCreate(params)
        .then((res) => {
          console.log(res);
          setVisible(false);
          setConfirmLoading(false);
          props.Reload(true)
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
      span: 4
    },
    wrapperCol: {
      span: 20
    }
  };
  return (
    <>
      <Button type='primary' status='warning'  onClick={() => setVisible(true)} >编辑</Button>
      <Modal
        focusLock={true}
        title="编辑"
        visible={visible}
        onOk={onOk}
        confirmLoading={confirmLoading}
        onCancel={() => setVisible(false)}
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
          initialValues={{
            num: props.num,
            startTime:dayjs(props.start_time, 'HH:mm'),
            price: props.price,
            remark: props.remark,
            place:props.place_id,
            staff:props.coach_id,
          }}
        >


          <FormItem label="开始时间" field="startTime" rules={[{ required: true }]}>
            <TimePicker
              step={{ minute: 5, second: 10}}
              style={{ width: 200, }}
            />
          </FormItem>
          <SelectStaffList mode="" />
          <SelectPlaceList mode="" venue={props.venue_id} />

          <FormItem initialValue={1} label="人数" field="num" rules={[{ required: true }]}>
            <InputNumber
              min={0}
              max={15}
              style={{ width: 200, }}
            />
          </FormItem>


          <FormItem label="定价" field="price" rules={[{ required: false }]}>
            <InputNumber
              placeholder=""
              step={0.01}
              style={{ width: 200, }}
              precision={1} />
          </FormItem>

          <FormItem label="备注" field="remark" rules={[{ required: false }]}>
            <TextArea  style={{ minHeight: 64, width: 350 }} />
          </FormItem>


          {/*


        placeId: res.placeId,
        num: res.,


        coachId: res.coachId,
        */}
        </Form>
      </Modal>
    </>
  );
}

export default Edit;