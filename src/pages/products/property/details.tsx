
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
    {
      label: '价格',
      value:  (
        <Statistic
          precision={2}
          suffix="¥"
          value={props.price}
          styleValue={{ fontSize: 14, color: '#000000' }}
          styleDecimal={{ fontSize: 12, color: '#000000' }}
        />
      ),
    },
    {
      label: '库存',
      value: props.stock,
    },
    {
      label: '简介',
      value: props.description,
      span: 3,
    },

  ];

  let cardProperty = ""
  if (props.type === "card"){
    cardProperty = <CardPropertyDetails card={[props]} />
  }
  let courseProperty = ""
  if (props.type === "course"){
    courseProperty = <CourseProperty card={[props]} />
  }
  let classProperty = ""
  if (props.type === "class"){
    classProperty = <ClassProperty card={[props]} />
  }

  return (
    <>
      <Button onClick={() => setVisible(true)} >详情</Button>
      <Modal
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
        {cardProperty !==""?cardProperty:null}
        {courseProperty !==""?courseProperty:null}
        {classProperty !==""?classProperty:null}
      </Modal>
    </>
  );
}

export default Details;