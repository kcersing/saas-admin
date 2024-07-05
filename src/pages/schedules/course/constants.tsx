import React from 'react';
import { Button, Space, Typography, Badge, Tooltip } from '@arco-design/web-react';
import IconText from './icons/text.svg';
import IconHorizontalVideo from './icons/horizontal.svg';
import IconVerticalVideo from './icons/vertical.svg';
import dayjs from 'dayjs';
import scheduleService from '@/api/schedule';

const { Text } = Typography;

const ContentIcon = [
  <IconText key={0} />,
  <IconHorizontalVideo key={1} />,
  <IconVerticalVideo key={2} />
];


export function getColumns(
  t: any,
  callback: (record: Record<string, any>, type: string) => Promise<void>
) {


  function SetScheduleCoachState(v, s) {

    scheduleService.setScheduleCoachState(
      {
        id: v.id,
        status: s
      }
    )
      .then((res) => {
        console.log(res);

      })
      .catch((err) => {
        console.log(err);
      });
  }


  return [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: '场馆',
      dataIndex: 'venue_name'
    },

    {
      title: '教练名称',
      dataIndex: 'coach_name'
    },
    {
      title: '课程',
      dataIndex: 'schedule_name'
    },
    {
      title: '会员名称',
      dataIndex: 'member_name'
    },
    {
      title: '会员手机号',
      dataIndex: 'mobile',
      render: (value) => <Text copyable>{value}</Text>
    },
    {
      title: '课程日期',
      dataIndex: '-',
      render: (_, record) => (
        <Space>
          {record.date}
        </Space>
      )
    },
    {
      title: '课程时间',
      dataIndex: '-',
      render: (_, record) => (
        <Space>
          {record.start_time} - {record.end_time}
        </Space>
      )
    },
    {
      title: '签到时间',
      dataIndex: '-',
      render: (_, record) => (
        <Space>
          {record.sign_start_time} - {record.sign_end_time}
        </Space>
      )
    },

    {
      title: '上课情况',
      dataIndex: 'status',
      render: (x) => {
        if (x === 0) {
          return <Badge status="error" text={'已取消'}></Badge>;
        } else if (x === 1) {
          return <Badge status="success" text={'待上课'}></Badge>;
        } else if (x === 2) {
          return <Badge status="success" text={'已上课'}></Badge>;
        } else if (x === 3) {
          return <Badge status="error" text={'旷课'}></Badge>;
        }
      }
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      render: (x) => dayjs(x).format('YYYY-MM-DD HH:mm:ss'),
      sorter: (a, b) => b.createdTime - a.createdTime
    },
    {
      title: '操作',
      dataIndex: 'operations',
      headerCellStyle: { paddingLeft: '15px' },
      render: (_, record) => {


        switch (record.status) {
          case 0  :
            return (<Space><Button type="secondary">已取消</Button></Space>);
            break;
          case 1 :
            return (
              <Space>
                <Button
                  disabled={record.status === 1 ? false : true}
                  type="outline"
                  status="warning"
                  onClick={() => SetScheduleCoachState(record, 2)}
                >
                  上课
                </Button>
                <Button
                  disabled={record.status === 1 ? false : true}
                  status="danger"
                  onClick={() => SetScheduleCoachState(record, 0)}>
                  取消
                </Button>
              </Space>
            );

            break;
          case 2 :
            return (<Space><Button type="primary" status="success">已签到</Button></Space>);
            break;
          default :
            return <Space></Space>;
        }


      }
    }
  ];
}

export default () => ContentIcon;