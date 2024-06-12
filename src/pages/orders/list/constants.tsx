import React from 'react';
import { Space,Space, Typography, Badge } from '@arco-design/web-react';
import IconText from './icons/text.svg';
import IconHorizontalVideo from './icons/horizontal.svg';
import IconVerticalVideo from './icons/vertical.svg';
import dayjs from 'dayjs';

import Edit from './edit';
import { Status } from './index';
import Details from './details';
import OrderPay from '@/pages/orders/pay';

const { Text } = Typography;

const ContentIcon = [
  <IconText key={0} />,
  <IconHorizontalVideo key={1} />,
  <IconVerticalVideo key={2} />,
];
export function getColumns(
  t:any,
  callback: (record: Record<string, any>, type: string) => Promise<void>
) {
  return [
    {
      title: '单号',
      dataIndex: 'order_sn',
      render: (value) => <Text copyable>{value}</Text>,
      width:240,

    },
    {
      title: '会员',
      dataIndex: 'member_name',
      placeholder: <>暂无</> ,
      render: (value) => <Text copyable>{value}</Text>,
    },
    {
      title: '场馆',
      dataIndex: 'venue_name',
      placeholder: <>暂无</> ,
      render: (value) => <Text copyable>{value}</Text>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width:240,
      render: (x: number) => {
        if (x === 0) {
          return <Space> <Badge status="warning" text={Status[x]}></Badge></Space>;
        }else if (x === 1){
          return <Space> <Badge status="warning" text={Status[x]}></Badge></Space>;
        }else if (x === 2){
          return <Badge status="success" text={Status[x]}></Badge>;
        }else if (x === 4){
          return <Badge status="processing" text={Status[x]}></Badge>;
        }else if (x === 5){
          return <Badge status="default" text={Status[x]}></Badge>;
        } else {
          return <Badge status="error" text={"未知状态"}></Badge>;
        }
      },
      placeholder: <>暂无</> ,
    },
    {
      title: '创建人',
      dataIndex: 'create_name',
      placeholder: <>暂无</> ,
    },
    {
      title: '创建时间',
      placeholder: <>暂无</> ,
      dataIndex: 'createdAt',
       render: (x) => dayjs(x).format('YYYY-MM-DD HH:mm:ss'),
       sorter: (a, b) => b.createdTime - a.createdTime,
    },
    {
      title: '完成时间',
      placeholder: <>暂无</> ,
      dataIndex: 'completion_at',
      render: (x) => dayjs(x).format('YYYY-MM-DD HH:mm:ss'),
      sorter: (a, b) => b.createdTime - a.createdTime,
    },
    // {
    //   title: '来源',
    //   dataIndex: 'source',
    //   placeholder: <>暂无</> ,
    //   render: (value) => <Text copyable>{value}</Text>,
    // },
    // {
    //   title: '设备来源',
    //   dataIndex: 'device',
    //   placeholder: <>暂无</> ,
    //   render: (value) => <Text copyable>{value}</Text>,
    // },
    {
      title: '操作',
      dataIndex: 'operations',
      width:240,

      render: (_, record) => (
        <Space>
          {record.status===0 ?null:<OrderPay orderSn={""} total={"100"}/> }
          {record.status===1 ?null:<OrderPay orderSn={""} total={"100"}/> }
          <Edit props={record}/>
          <Details props={record} />
          {/*<Button*/}
          {/*  type="text"*/}
          {/*  size="small"*/}
          {/*  onClick={() => callback(record, 'view')}*/}
          {/*>*/}
          {/*  {t['searchTable.columns.operations.view']}*/}
          {/*</Button>*/}
        </Space>
      ),
    },
  ];
}
export default () => ContentIcon;