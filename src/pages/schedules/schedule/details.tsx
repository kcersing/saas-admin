import React, { useEffect } from 'react';
import { Modal, Button, Table, Alert, Popover, Card, Link, Descriptions, Space, Tooltip } from '@arco-design/web-react';
import {
  IconAttachment,
  IconHistory,
  IconLocation,
  IconPlus,
  IconUser,
  IconUserGroup
} from '@arco-design/web-react/icon';
import Edit from './edit';
import scheduleService, { scheduleMemberStatus } from '@/api/schedule';
import Subscribe from './subscribe';

function Details(props) {

  const scheduleData = [
    {
      label: <Tooltip content="预约人数"> <IconUserGroup /></Tooltip>,
      value: props.detailsProps.num_surplus + '-' + props.detailsProps.num + '已预约人数'
    },
    {
      label: <Tooltip content="课程时间"> <IconHistory /></Tooltip>,
      value: props.detailsProps.start_time + '-' + props.detailsProps.end_time
    },
    {
      label: <Tooltip content="场地名称"> <IconLocation /></Tooltip>,
      value: props.detailsProps.place_name
    },
    {
      label: <Tooltip content="教练名称"> <IconUser /></Tooltip>,
      value: props.detailsProps.coach_name
    },
    {
      label: <Tooltip content="备注"> <IconAttachment /></Tooltip>,
      value: props.detailsProps.remark
    }
  ];

  const [visible2, setVisible2] = React.useState(false); // Popover
  const [visible3, setVisible3] = React.useState(false); // Popover

  const columns = [
    {
      title: '姓名',
      dataIndex: 'member_name'
    },
    {
      title: '性别',
      dataIndex: 'gender'
    },
    {
      title: '年龄',
      dataIndex: 'birthday'

    },
    {
      title: '手机号',
      dataIndex: 'mobile'

    },
    {
      title: '上课情况',
      dataIndex: 'status'

    },
    {
      title: '预约时间',
      dataIndex: 'createdAt'

    },
    {
      title: '操作',
      dataIndex: 'operations',
      headerCellStyle: { paddingLeft: '15px' },
      render: (_, record) => {

        switch (record.status) {
          case 0  :
            return (<Space><Button type='secondary'>已取消</Button></Space>)
            break;
          case 1 :
            return (
              <Space>
                <Button
                  disabled={record.status === 1 ? false : true}
                  type="outline"
                  status="warning"
                  onClick={() => SetScheduleMemberState(record, 2)}
                >
                  上课
                </Button>
                <Button
                  disabled={record.status === 1 ? false : true}
                  status="danger"
                  onClick={() => SetScheduleMemberState(record, 0)}>
                  取消
                </Button>
              </Space>
            )

            break;
          case 2 :
            return (<Space><Button type="primary" status="success">已签到</Button></Space>)
            break;
          default :
            return <Space></Space>;
        }


      }
    }

  ];

  const [subscribeVisible, setSubscribeVisible] = React.useState(false); // subscribe

  const SubscribeVisible = (v) => {
    setSubscribeVisible(v);
  };

  const [listData, setListData] = React.useState([]); // table
  function getListData() {
    scheduleService.getScheduleMemberList({ schedule: props.detailsProps.id, page: 1, pageSize: 999 })
      .then((res) => {
        setListData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function SetScheduleState(v) {
    console.log(v);
    scheduleService.scheduleStatus(
      {
        id: props.detailsProps.id,
        status: v
      }
    )
      .then((res) => {
        console.log(res);
        props.Visible(false);
        props.Reload(true)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function SetScheduleMemberState(v, s) {

    scheduleService.scheduleMemberStatus(
      {
        id: v.id,
        status: s
      }
    )
      .then((res) => {
        console.log(res);
        props.Visible(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  useEffect(() => {
    getListData();
  }, []);

  const Reload = (r) => {
    if (r) {
      getListData();
    }
  };
  return (
    <>
      <Modal
        focusLock={true}
        unmountOnExit
        title={'详情'}
        visible={props.visibles}
        onCancel={() => {
          props.Visible(false);
        }}
        style={{ width: 1000 }}
        onOk={() => {
          props.Visible(false);
        }}
      >
        <Descriptions
          style={{ width: 900, padding: 20 }}
          border
          data={scheduleData.slice(0, 5)}
          column={5}
        />
        <Card>
          <Space style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginRight: 20
          }}>


            {props.detailsProps.status===0 && (<><Button type="dashed">已取消</Button></>) }
            {props.detailsProps.status===1 && (<>
              <Edit props={props} />
              <Popover
                trigger="click"
                popupVisible={visible2}
                onVisibleChange={setVisible2}
                content={
                  <span>
                 <p>确定要上课签到吗？</p>
                  <Space>
                  <Button
                    status="warning"
                    type="text"
                    onClick={() => SetScheduleState(2)}
                  >
                   签到
                  </Button>
                  <Button
                    status="danger"
                    type="text"
                    onClick={() => setVisible2(false)}
                  >
                    取消
                  </Button>
                </Space>
              </span>

                }
              >
                <Button type="primary" status="success">
                  上课
                </Button>
              </Popover>
              <Popover
                trigger="click"
                popupVisible={visible3}
                onVisibleChange={setVisible3}
                content={
                  <span>
                 <p>确定要取消课程吗？</p>
                  <Space>
                  <Button
                    status="danger"
                    type="text"
                    onClick={(v) => SetScheduleState(0)}
                  >
                   确定
                  </Button>
                  <Button
                    status="danger"
                    type="text"
                    onClick={() => setVisible3(false)}
                  >
                    取消
                  </Button>
                </Space>
              </span>
                }
              >
                <Button type="dashed">
                  取消
                </Button>
              </Popover>

              <Button type="primary" onClick={() => setSubscribeVisible(true)}>
                预约
              </Button>
            </>) }
            {props.detailsProps.status===2 && (<>
              <Button type="primary" onClick={() => setSubscribeVisible(true)}>上课中</Button>
            </>) }
            {props.detailsProps.status===3 && (<>
              <Button type="primary" onClick={() => setSubscribeVisible(true)}>已经下课</Button>
            </>) }

          </Space>
        </Card>
        <div style={{ width: 900, padding: 20 }}>
          <Table
            columns={columns}
            data={listData}
            pagination={false}
            border={{ headerCell: true, wrapper: true }}
            rowKey="id"
            rowSelection={{ type: 'checkbox', checkAll: true }}
          ></Table>
        </div>
      </Modal>


      {subscribeVisible ?
        <Subscribe Reload={Reload} SubscribeVisible={SubscribeVisible} subscribeVisible={subscribeVisible}
                   schedule={props.detailsProps} /> : null}
    </>
  );
}

export default Details;