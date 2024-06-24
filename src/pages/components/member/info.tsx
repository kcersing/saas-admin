import React, { useState, useEffect, useMemo, useContext } from 'react';
import {
  Button,
  Form,
  Input,
  Message,
  Modal,
  Table,
  Spin,
  Card,
  Select,
  Tabs,
  Divider,
  Typography,
  Alert,
  InputNumber,
  Empty,
  Statistic
} from '@arco-design/web-react';

import memberService from '@/api/member';

import InfoHeader from './header';
import Main from './main';

const Info = ({ Visible, visibles, memberValue, memberOption }) => {

  const [loading, setLoading] = React.useState(false); // table

  const [memberInfo, setMemberInfo] = React.useState(null);

  const [memberInfoErr, setMemberInfoErr] = React.useState('');


  useEffect(() => {
    loadData();
  }, [visibles, memberValue, memberOption]);
  console.log(visibles, memberValue, memberOption);




  function loadData() {
    setLoading(true);

    const params = {
      option: memberOption,
      value: memberValue
    };

    memberService.memberSearch(params)
      .then((res) => {
        setMemberInfo(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setMemberInfoErr(err.message);
      });



  }
  return (
    <>
      {/*<Button type='primary' htmlType='submit' style={{height:36,marginRight: 5 }} onClick={() => setVisible(true)} icon={<IconAlipayCircle />}>{props.title}</Button>*/}
      <Modal
        focusLock={true}
        unmountOnExit={true}
        visible={visibles}
        onCancel={() => {
          Visible(false);
        }}
        closable
        maskClosable={false}
        style={{ width: 1000,  top: 20 }}
        footer={null}
        getPopupContainer={() => document.body}


        alignCenter={false}

        afterClose={() => setData([])}
      >

        {memberInfo && (<>
          <Card style={{ padding: '14px 20px' }}>
            <InfoHeader memberInfo={memberInfo} loading={loading} />
          </Card>
          <Main memberInfo={memberInfo} loading={loading} />

        </>)
        }

        {!memberInfo && <> <Alert style={{ marginTop: 20,marginBottom:30}} type='error' content={memberInfoErr} /><Empty /></>}


      </Modal>
    </>
  );
}

export default Info;