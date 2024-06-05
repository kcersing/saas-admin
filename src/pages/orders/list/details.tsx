
import React, {useRef, useState } from 'react';

import { Button, Modal,Space,Typography, Descriptions, Statistic,Card } from '@arco-design/web-react';
import CardPropertyDetails  from '@/pages/components/details/cardProperty';
import CourseProperty from '@/pages/components/details/courseProperty';
import ClassProperty from '@/pages/components/details/classProperty';



function Details({ props }) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  console.log(props)

  const title= props.name+"(ID:"+props.id+")"
  const data = [
    {
      label: '创建人',
      value: props.create_name,
    },
  ];


  return (
    <>
      <Button size='mini' onClick={() => setVisible(true)} >详情</Button>
      <Modal
        focusLock={true}
        title={title}
        mountOnEnter={false}
        unmountOnExit={true}
        visible={visible}
        confirmLoading={confirmLoading}
        footer={null}
        onCancel={() => setVisible(false)}
        style={{width:1000}}
      >
        <Card bordered title='基础属性' style={{ marginBottom: 20 , width: 960}}>
          <Descriptions border data={data}  />
        </Card>
      </Modal>
    </>
  );
}

export default Details;