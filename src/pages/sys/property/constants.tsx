import React from 'react';
import { Button, Typography, Badge } from '@arco-design/web-react';
import IconText from './icons/text.svg';
import IconHorizontalVideo from './icons/horizontal.svg';
import IconVerticalVideo from './icons/vertical.svg';
import dayjs from 'dayjs';

import EditOrder from '@/pages/sys/order/edit';
import { ContentType, FilterType, Status } from './index';

const { Text } = Typography;



const ContentIcon = [
  <IconText key={0} />,
  <IconHorizontalVideo key={1} />,
  <IconVerticalVideo key={2} />,
];
export function getColumns(
  t: any,
  callback: (record: Record<string, any>, type: string) => Promise<void>
) {
  return [
    {
      title: '编号',
      dataIndex: 'order_sn',
      render: (value) => <Text copyable>{value}</Text>,
    },
    {
      title: '场馆',
      dataIndex: 'venue_id',
    },
    {
      title: '会员',
      dataIndex: 'member_id',
      render: (value) => <Text copyable>{value}</Text>,
    },
    {
      title: '产品',
      dataIndex: 'venue_id',
      render: (value) => <Text copyable>{value}</Text>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (x: number) => {
        console.log(x)
        if (x === 0) {
          return <Badge status="default" text={Status[x]}></Badge>;
        }else if (x === 1){
          return <Badge status="processing" text={Status[x]}></Badge>;
        }else if (x === 2){
          return <Badge status="success" text={Status[x]}></Badge>;
        }else if (x === 3){
          return <Badge status="warning" text={Status[x]}></Badge>;
        }else {
          return <Badge status="error" text={Status[x]}></Badge>;
        }
      },
    },
    {
      title: '创建人',
      dataIndex: 'create_id',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
       render: (x) => dayjs(x).format('YYYY-MM-DD HH:mm:ss'),
       sorter: (a, b) => b.createdTime - a.createdTime,
    },
    {
      title: '支付完成时间',
      dataIndex: 'completionAt',
      render: (x) => dayjs(x).format('YYYY-MM-DD HH:mm:ss'),
      sorter: (a, b) => b.createdTime - a.createdTime,
    },
    {
      title: '操作',
      dataIndex: 'operations',
      headerCellStyle: { paddingLeft: '15px' },
      render: (_, record) => (
        <>

          <EditOrder props={record}/>
          <Button
            type="text"
            size="small"
            onClick={() => callback(record, 'view')}
          >
            {t['searchTable.columns.operations.view']}
          </Button>
        </>
      ),
    },
  ];
}
export default () => ContentIcon;