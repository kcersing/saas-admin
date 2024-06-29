import React from 'react';
import { Button, Space,Typography, Badge ,TreeSelect, Radio } from '@arco-design/web-react';
import { useState } from 'react';
import IconText from './icons/text.svg';
import IconHorizontalVideo from './icons/horizontal.svg';
import IconVerticalVideo from './icons/vertical.svg';
import dayjs from 'dayjs';

import Edit from './edit';
import { ContentType, FilterType, Status } from './index';
import Menus from './menus';
import Apis from './apis';

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
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '角色值',
      dataIndex: 'value',
      render: (value) => <Text copyable>{value}</Text>,
    },
    {
      title: '备注',
      dataIndex: 'remark',
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
      dataIndex: 'created_at',
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
          <Apis props={record}/>
          <Menus props={record}/>
        </Space>
      ),
    },
  ];
}
export default () => ContentIcon;