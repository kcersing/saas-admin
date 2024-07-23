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

import { useLocation } from 'react-router-dom';
function MemberDetails() {

  const location = useLocation();
  const { id } = location.state;

  const [loading, setLoading] = React.useState(false); // table

  const [memberInfo, setMemberInfo] = React.useState(null);

  const [memberInfoErr, setMemberInfoErr] = React.useState('');

  useEffect(() => {
    loadData();
  }, []);



  function loadData() {
    setLoading(true);

    const params = {
      option: "1",
      value: id.toString()
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

<Card>
        {memberInfo && (<>
          <Card style={{ padding: '14px 20px' }}>
            <InfoHeader memberInfo={memberInfo} loading={loading} />
          </Card>
          <Main memberInfo={memberInfo} loading={loading} />

        </>)
        }

        {!memberInfo && <> <Alert style={{ marginTop: 20, marginBottom: 30 }} type="error" content={memberInfoErr} /><Empty /></>}
</Card>
    </>
  );
}

export default MemberDetails;