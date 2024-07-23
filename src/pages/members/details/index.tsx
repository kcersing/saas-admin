import React, { useState, useEffect, useMemo } from 'react';
import {
  Table,
  Card,
  PaginationProps,
  Button,
  Space,
  Typography,
  Empty, Alert, Modal
} from '@arco-design/web-react';
import InfoHeader from '@/pages/components/member/header';
import Main from '@/pages/components/member/main';
import memberService from '@/api/member';


function MemberDetails({ Visible, visibles, memberValue, memberOption }) {

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
        style={{ top: 20, maxWidth: 1200, minWidth: 1000 }}
        footer={null}
        getPopupContainer={() => document.body}
        alignCenter={false}
      >

        {memberInfo && (<>
          <Card style={{ padding: '14px 20px' }}>
            <InfoHeader memberInfo={memberInfo} loading={loading} />
          </Card>
          <Main memberInfo={memberInfo} loading={loading} />

        </>)
        }

        {!memberInfo && <> <Alert style={{ marginTop: 20, marginBottom: 30 }} type="error" content={memberInfoErr} /><Empty /></>}

      </Modal>
    </>
  );
}

export default MemberDetails;