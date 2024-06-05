import React from 'react';
import { Modal, Button, Table, Alert, Card, Descriptions, Space,Tooltip } from '@arco-design/web-react';
import {
  IconAttachment,
  IconHistory,
  IconLocation,
  IconPlus,
  IconUser,
  IconUserGroup
} from '@arco-design/web-react/icon';

function Details({props}) {

  const scheduleData = [
    {
      label: <Tooltip content='预约人数'> <IconUserGroup /></Tooltip>,
      value: props.num_surplus+"-"+props.num+"已预约人数",
    },
    {
      label:<Tooltip content='课程时间'>  <IconHistory /></Tooltip>,
      value: props.start_time +"-"+ props.end_time,
    },
    {
      label:<Tooltip content='场地名称'>  <IconLocation /></Tooltip>,
      value: props.place_name,
    },
    {
      label: <Tooltip content='教练名称'> <IconUser /></Tooltip>,
      value: props.coach_name,
    },
    {
      label: <Tooltip content='备注'> <IconAttachment /></Tooltip>,
      value: props.remark,
    },
  ];


  const [visible, setVisible] = React.useState(false); // table

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: '性别',
      dataIndex: 'version',
      sorter: (a, b) => {
        const aVersion = a.version.split('.');
        const bVersion = b.version.split('.');

        for (let i = 0; i < aVersion.length; i++) {
          if (aVersion[i] === bVersion[i]) continue;
          return aVersion[i] - bVersion[i];
        }

        return 1;
      },
    },
    {
      title: '年龄',
      dataIndex: 'author',
      sorter: (a, b) => a.author.length - b.author.length,
    },

    {
      title: '手机号',
      dataIndex: 'author',
      sorter: (a, b) => a.author.length - b.author.length,
    },

    {
      title: '上课情况',
      dataIndex: 'author',
      sorter: (a, b) => a.author.length - b.author.length,
    },
    {
      title: '预约时间',
      dataIndex: 'author',
      sorter: (a, b) => a.author.length - b.author.length,
    },
    {
      title: '操作',
      dataIndex: 'author',

    },

  ];
  const data = [
    {
      id: '1',
      name: 'EduTools',
      version: '12.18.1',
      author: 'Dickens',
    },
  ];
  return (
    <>
      <Card style={{backgroundColor: '#E8FFFB', marginBottom: 10 }} onClick={() => setVisible(true)}  >
          <Descriptions
            title={props.name}
            column={1}
            data={scheduleData}
            size={"mini"}
            colon
            labelStyle={{ textAlign: 'right', paddingRight: 20}}
          />
      </Card>

      <Modal
        focusLock={true}
        unmountOnExit
        title={"详情"}
        visible={visible}
        style={{width:1000}}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <Descriptions
          style={{width:900, padding: 20}}
          border
          data={scheduleData.slice(0, 5)}
          column={5}
        />
        <div style={{width:900, padding: 20}}>
          <Table
            columns={columns}
            data={data}
            pagination={false}
            border={{ headerCell: true, wrapper: true }}
            rowKey='id'
            rowSelection={{ type: 'checkbox', checkAll: true }}
          ></Table>
        </div>
      </Modal>

    </>
  );
}

export default Details;