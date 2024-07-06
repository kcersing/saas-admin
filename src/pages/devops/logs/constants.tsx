import React from 'react';
import { Button,Space, Typography, Badge } from '@arco-design/web-react';
import IconText from './icons/text.svg';
import IconHorizontalVideo from './icons/horizontal.svg';
import IconVerticalVideo from './icons/vertical.svg';
import dayjs from 'dayjs';

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
      title: 'API',
      dataIndex: 'api',
    },
    {
      title: '请求方式',
      dataIndex: 'method',
    },
    {
      title: '访问IP',
      dataIndex: 'ip',
      render: (value) => <Text copyable>{value}</Text>,
    },
    {
      title: '请求数据',
      dataIndex: '-',
      headerCellStyle: { paddingLeft: '15px' },
      render: (_, record) => (
        <Space>
         <p>{record.reqContent} </p>
          <p>  {record.respContent} </p>
        </Space>
      ),
    },
    {
      title: '请求时间',
      dataIndex: 'createdAt',
       render: (x) => dayjs(x).format('YYYY-MM-DD HH:mm:ss'),
       sorter: (a, b) => b.createdTime - a.createdTime,
    },

    {
      title: '成功信息',
      dataIndex: '-',
      render: (_, record) => (
        <Space>
          {record.success? <Badge status="success" text="成功" />:<Badge status="error" text="失败" />}

        </Space>
      ),
    },
    // {
    //   title: '设备信息',
    //   dataIndex: 'userAgent',
    //   render: (value) => <Text copyable>{value}</Text>,
    // },
    // {
    //   title: '操作',
    //   dataIndex: 'operations',
    //   headerCellStyle: { paddingLeft: '15px' },
    //   render: (_, record) => (
    //     <Space>
    //       <Button
    //         type="text"
    //         size="small"
    //         onClick={() => callback(record, 'view')}
    //       >
    //         {t['searchTable.columns.operations.view']}
    //       </Button>
    //     </Space>
    //   ),
    // },
  ];
}
export default () => ContentIcon;