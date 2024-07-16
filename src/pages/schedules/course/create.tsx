import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Input,DatePicker ,Space} from '@arco-design/web-react';

import SearchByMember from '@/pages/components/select/searchByMember';
import SelectMemberProductList from '@/pages/components/select/selectMemberProductList';
import SelectVenueList from '@/pages/components/select/selectVenueList';
import SelectMemberProperyList from '@/pages/components/select/selectMemberPropertyList';
import SelectStaffList from '@/pages/components/select/selectStaffList';
import { useSelector } from 'react-redux';
import { GlobalState } from '../../../../types/global';
import scheduleService from '@/api/schedule';
import dayjs from 'dayjs';


const TextArea = Input.TextArea;
const FormItem = Form.Item;

function Create(props: { Reload: (arg0: boolean) => void; }) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const userInfo = useSelector((state: GlobalState) => state.userInfo);

  function onOk() {
    form.validate().then((res) => {
      const params = {
        type: "course",
        propertyId: property,
        venueId: userInfo.defaultVenueId,
        placeId: 0,
        num: 1,
        startTime:dayjs( res.startTime ).format('YYYY-MM-DD HH:mm:ss'),
        price: 0,
        remark: res.remark,
        coachId: res.staff,
        memberId: res.memberS,
        memberProductId : res.member_product,
        memberProductPropertyId : res.member_propery,
      }
    
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
  const [members, setMembers] = useState(0);
  const Members = (r) => {
    if(r){
      setMembers(r);
    }
    console.log(members)
  }

  const [memberProduct, setMemberProduct] = useState(0);
  const MemberProduct = (r) => {
    if(r){
      setMemberProduct(r);
    }
    console.log(members)
  }
  const [memberProperty, setMemberProperty] = useState(0);
  const MemberProperty = (r) => {
    if(r){
      setMemberProperty(r);
    }
  }

  const [property, setProperty] = useState(0);
  const Property= (r) => {
    if(r){
      setProperty(r);
    }
  }

  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };

  const [dateValue, setDateValue] = useState();

  useEffect(() => {
    setDateValue(Date.now());
  }, [userInfo.defaultVenueId]);


  return (
    <div>
      <Button onClick={() => setVisible(true)} type='primary'>
        约课
      </Button>
      <Modal
        title='约课'
        visible={visible}
        onOk={onOk}
        confirmLoading={confirmLoading}
        onCancel={() => setVisible(false)}
      >
        <Form
          {...formItemLayout}
          form={form}
          labelCol={{
            style: { flexBasis: 90 },
          }}
          wrapperCol={{
            style: { flexBasis: 'calc(100% - 90px)' },
          }}
        >

          <SearchByMember Members={Members} />

          {/*<SelectVenueList Venue={Venue} />*/}

          <SelectMemberProductList members={members} MemberProduct={MemberProduct} venue={userInfo.defaultVenueId} type="course"/>

          <SelectMemberProperyList members={members} memberProduct={memberProduct} MemberProperty={MemberProperty} Property={Property} venue={userInfo.defaultVenueId} type="course"/>

          <FormItem initialValue={dateValue} label="时间" field="startTime" rules={[{ required: false }]}>
            <DatePicker
              showTime
              value={dateValue}
              onChange={(v) => setDateValue(v)}
              style={{ width: 200 }}
            />
          </FormItem>
          <SelectStaffList mode="" />
          <FormItem label="备注" field="remark" rules={[{ required: false }]}>
            <TextArea  style={{ minHeight: 64, width: 350 }} />
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}

export default  Create;