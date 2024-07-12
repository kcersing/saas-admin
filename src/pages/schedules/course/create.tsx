import { useState } from 'react';
import { Modal, Button, Form, Input } from '@arco-design/web-react';
import venueService from '@/api/venue';
import SearchByMember from '@/pages/components/select/searchByMember';
import SelectMemberProductList from '@/pages/components/select/selectMemberProductList';
import SelectVenueList from '@/pages/components/select/selectVenueList';
import SelectMemberProperyList from '@/pages/components/select/selectMemberPropertyList';


const TextArea = Input.TextArea;
const FormItem = Form.Item;

function Create(props: { Reload: (arg0: boolean) => void; }) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  function onOk() {
    form.validate().then((res) => {
      const params = {

      }
      console.log(res);
      setConfirmLoading(true);


          setVisible(false);
          setConfirmLoading(false);
          props.Reload(true);
      // venueService.venueCreate(params)
      //   .then((res) => {
      //     console.log(res);
      //     setVisible(false);
      //     setConfirmLoading(false);
      //     props.Reload(true);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     setVisible(false);
      //     setConfirmLoading(false);
      //   });
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


  const [venue, setVenue] = useState(0);
  const Venue = (r) => {
    if(r){
      setVenue(r);
    }

  }

  console.log(members,memberProduct,memberProperty)


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

          <SelectVenueList Venue={Venue} />

          <SelectMemberProductList members={members} MemberProduct={MemberProduct} venue={1} type="course"/>

          <SelectMemberProperyList members={members} memberProduct={memberProduct} MemberProperty={MemberProperty} venue={1} type="course"/>
          <FormItem label="时间" field="latitude" rules={[{ required: false }]}>
            <Input placeholder=""  />
          </FormItem>

        </Form>
      </Modal>
    </div>
  );
}

export default  Create;