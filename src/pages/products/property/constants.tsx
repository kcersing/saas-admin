import React from 'react';
import { Button, Typography, Badge } from '@arco-design/web-react';
import IconText from './icons/text.svg';
import IconHorizontalVideo from './icons/horizontal.svg';
import IconVerticalVideo from './icons/vertical.svg';
import dayjs from 'dayjs';

import Edit from './edit';
import { Status } from './index';
import { IconIdcard,IconTags,IconTag } from '@arco-design/web-react/icon';
import Details from './details';

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
      title: '类型',
      dataIndex: 'type',
      placeholder: <>暂无</> ,
      render: (x: string) => {
        if (x === 'card') {
          return <span><IconIdcard style={{ color: '#f7ba1e', }} />卡</span>;
            }else if (x === 'course'){
          return <span><IconTag />私教课</span>;
        }else if (x === 'class'){
              return <span><IconTags />团教课</span>;
            }else {
          return ;
        }
      },



    },
    {
      title: '名称',
      dataIndex: 'name',
      placeholder: <>暂无</> ,
      render: (value) => <Text copyable>{value}</Text>,
    },
    {
      title: '定价',
      dataIndex: 'price',
      placeholder: <>暂无</> ,
      render: (value) => <Text copyable>{value}</Text>,
    },
    {
      title: '总时长',
      dataIndex: 'duration',
      placeholder: <>暂无</> ,
      render: (value) => <Text copyable>{value}</Text>,
    },
    {
      title: '单次时长',
      dataIndex: 'length',
      placeholder: <>暂无</> ,
      render: (value) => <Text copyable>{value}</Text>,
    },
    {
      title: '次数',
      dataIndex: 'count',
      placeholder: <>暂无</> ,
      render: (value) => <Text copyable>{value}</Text>,
    },
    {
      title: '场馆',
      dataIndex: 'venue',
      render: (value) => {
   return (
     <>
       {value.map((v) => (
        <span>{ v.name};</span>
       ))}
     </>)
      },
      placeholder: <>暂无</> ,
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (x: number) => {
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
      placeholder: <>暂无</> ,
    },
    {
      title: '创建人',
      dataIndex: 'create_id',
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
      title: '操作',
      dataIndex: 'operations',
      headerCellStyle: { paddingLeft: '15px' },
      render: (_, record) => (
        <>
          <Edit props={record}/>
          <Details props={record} />
          {/*<Button*/}
          {/*  type="text"*/}
          {/*  size="small"*/}
          {/*  onClick={() => callback(record, 'view')}*/}
          {/*>*/}
          {/*  {t['searchTable.columns.operations.view']}*/}
          {/*</Button>*/}
        </>
      ),
    },
  ];
}
export default () => ContentIcon;