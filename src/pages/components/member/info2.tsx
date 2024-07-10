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

const Info2 = ({member }) => {

  const [loading, setLoading] = React.useState(false); // table
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    loadData();
  }, [member]);
  console.log( member);

  function loadData() {
    setLoading(false);
  }
  return (
    <>
     <Button type='primary' htmlType='submit' style={{height:36,marginRight: 5 }} onClick={() => setVisible(true)} >详情</Button>
      <Modal
        focusLock={true}
        unmountOnExit={true}
          visible={visible}
        onCancel={() => {
          setVisible(false)
        }}
        closable
        maskClosable={false}
        style={{  top: 20,maxWidth: 1200, minWidth:1000 }}
        footer={null}
        getPopupContainer={() => document.body}
        alignCenter={false}
      >

          <Card style={{ padding: '14px 20px' }} loading={loading}>
            <InfoHeader memberInfo={member} loading={loading} />
          </Card>
          <Main memberInfo={member} loading={loading} />


      </Modal>
    </>
  );
}

export default Info2;