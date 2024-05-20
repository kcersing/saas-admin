import React from 'react';
import { Button, Typography, Badge } from '@arco-design/web-react';
import IconText from './icons/text.svg';
import IconHorizontalVideo from './icons/horizontal.svg';
import IconVerticalVideo from './icons/vertical.svg';
import dayjs from 'dayjs';

import EditMember from './edit';
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
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '联系人手机号',
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
      dataIndex: 'created_at',
       render: (x) => dayjs(x).format('YYYY-MM-DD HH:mm:ss'),
       sorter: (a, b) => b.createdTime - a.createdTime,
    },
    {
      title: '操作',
      dataIndex: 'operations',
      headerCellStyle: { paddingLeft: '15px' },
      render: (_, record) => (
        <>

          <EditMember props={record}/>
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