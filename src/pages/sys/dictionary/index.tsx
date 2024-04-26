 import React from 'react';

import {
  Table,
  Card,
  PaginationProps,
  Button,
  Space,
  List,
  Typography, TableColumnProps,
} from '@arco-design/web-react';
 import { render } from 'react-dom';


 const { Title } = Typography;





 const columns: TableColumnProps[] = [
   {
     title: 'Name',
     dataIndex: 'name',
   },
   {
     title: 'Salary',
     dataIndex: 'salary',
   },
   {
     title: 'Address',
     dataIndex: 'address',
   },
   {
     title: 'Email',
     dataIndex: 'email',
   },
 ];
 const data = [
   {
     key: '1',
     name: 'Jane Doe',
     salary: 23000,
     address: '32 Park Road, London',
     email: 'jane.doe@example.com',
   },
   {
     key: '2',
     name: 'Alisa Ross',
     salary: 25000,
     address: '35 Park Road, London',
     email: 'alisa.ross@example.com',
   },
   {
     key: '3',
     name: 'Kevin Sandra',
     salary: 22000,
     address: '31 Park Road, London',
     email: 'kevin.sandra@example.com',
   },
   {
     key: '4',
     name: 'Ed Hellen',
     salary: 17000,
     address: '42 Park Road, London',
     email: 'ed.hellen@example.com',
   },
   {
     key: '5',
     name: 'William Smith',
     salary: 27000,
     address: '62 Park Road, London',
     email: 'william.smith@example.com',
   },
 ];




 import { IconEdit, IconDelete, IconDown, IconLoading } from '@arco-design/web-react/icon';


 const dataSource = [
   'Beijing ',
   'Bytedance',
   'Beijing',
   'Beijing',
   'China',
 ];
 const Listss =(

   <List
     style={{ width: 622 }}
     size='small'
     header='List title'
     dataSource={dataSource}
     render={render.bind((item, index) => <List.Item key={index}>{item}</List.Item>, [
       <span className='list-demo-actions-icon'>
            <IconEdit />
          </span>,
       <span className='list-demo-actions-icon'>
            <IconDelete />
          </span>,
     ])}
   />
 );
export default function Dictionary() {
  return (<>
    <Card style={{ width: '20%' , float:'left'}}>
      {Listss}

    </Card>
      <Card style={{ width: '79%', float:'right' }}>
      <Title heading={6}>详情</Title>
      <Typography.Title heading={6}>
        解释
      </Typography.Title>
      <Table columns={columns} data={data} />
    </Card></>
  );
}



