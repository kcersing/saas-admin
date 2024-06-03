import React from 'react';
import { Modal, Button, Table, Alert, Card, Descriptions } from '@arco-design/web-react';
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
      label:  <IconUserGroup />,
      value: props.num+"-"+props.num_surplus,
    },
    {
      label: <IconHistory />,
      value: props.start_time +"-"+ props.end_time,
    },
    {
      label: <IconLocation />,
      value: props.place_name,
    },
    {
      label: <IconAttachment />,
      value: props.remark,
    },
    {
      label: <IconUser />,
      value: props.coach_name,
    },
  ];


  const [visible, setVisible] = React.useState(false); // table

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Version',
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
      title: 'Author',
      dataIndex: 'author',
      sorter: (a, b) => a.author.length - b.author.length,
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
        unmountOnExit
        title='Manage Plugins'
        visible={visible}
        className='modal-demo-without-content-spacing'
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <Alert closable type='info' content='This message displays only once.' />
        <div style={{ padding: 20 }}>
          <p>
            You can select multiple plugins for the current project so that our app will verify that
            the plugins are installed and enabled.
          </p>
          <p style={{ marginTop: 20, marginBottom: 8, fontWeight: 600 }}>List of plugins</p>
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