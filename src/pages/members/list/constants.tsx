import React from 'react';
import { Button,Space, Typography, Badge,Avatar } from '@arco-design/web-react';
import IconText from './icons/text.svg';
import IconHorizontalVideo from './icons/horizontal.svg';
import IconVerticalVideo from './icons/vertical.svg';
import dayjs from 'dayjs';

import { ContentType, FilterType, Status } from './index';
import Edit from './edit';
import Details from './details';

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
      title: 'ID',
      dataIndex: 'id',
    },

    {
      title: '头像',
      dataIndex: 'avatar',
      render: (value) =>
         <Avatar>
              <img
                alt='avatar'
                src={value}
              />
            </Avatar>
      ,
    },

    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      render: (value) => <Text copyable>{value}</Text>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (x) => {
        if (x === 0) {
          return <Badge status="error" text={Status[x]}></Badge>;
        }
        return <Badge status="success" text={Status[x]}></Badge>;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
       render: (x) => dayjs(x).format('YYYY-MM-DD HH:mm:ss'),
       sorter: (a, b) => b.createdTime - a.createdTime,
    },
    {
      title: '操作',
      dataIndex: 'operations',
      headerCellStyle: { paddingLeft: '15px' },
      render: (_, record) => (
        <Space>
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