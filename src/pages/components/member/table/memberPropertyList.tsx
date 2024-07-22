import { Button, PaginationProps, Space, Table, Statistic } from '@arco-design/web-react';
import React, { useEffect, useState } from 'react';
import memberService from '@/api/member';


export default function MemberPropertyList({ memberInfo = {}, loading,type}: { memberInfo: any; loading: boolean;type:string }) {

  let columns = []
if (type=="card"){
   columns = [
    {
      title: '产品名称',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length
    },
    {
      title: '使用场馆',
      dataIndex: 'venues',
    },
    {
      title: '价格',
      dataIndex: 'price',
      render: (_, record) =>  (
        <>
          {record.price}{'¥'}
        </>)
    },
    {
      title: '期限',
      dataIndex: 'duration',
      render: (_, record) =>  (
          <>{record.duration}{'天'}</>
      )
    },
     {
       title: '激活时间',
       dataIndex: 'validity_at',
     },
     {
       title: '截至时间',
       dataIndex: 'cancel_at',
     },
    {
      title: '次数',
      dataIndex: '-',
      render: (_, record) =>  ( <>
        {record.count>0? record.count +"-" +record.count_surplus : <>-</> }
      </>)
    },
    // {
    //   title: '操作',
    //   dataIndex: 'operations',
    //   headerCellStyle: { paddingLeft: '15px' },
    //   render: (_, record) => (
    //     <Space>
    //       {(record.count>0 && record.count_surplus>0) || record.count==0 ?
    //         <Button
    //           onClick={() => {console.log(record)}
    //           }
    //         >
    //           进馆签到
    //         </Button>:<></>}
    //     </Space>
    //   ),
    // },
  ];

}else {

   columns = [
    {
      title: '产品名称',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length
    },
    {
      title: '使用场馆',
      dataIndex: 'venues',
    },
    {
      title: '单价',
      dataIndex: 'price',
      render: (_, record) =>  (
        <>
        {record.price}{'¥'}
        </>)
    },
    {
      title: '时长',
      dataIndex: 'length',
      render: (_, record) =>  (
        <>
          {record.length}{'分钟'}
        </>)
    },
    {
      title: '次数',
      dataIndex: '-',
      render: (_, record) =>  ( <>
        {record.count>0? record.count +"-" +record.count_surplus : <>-</> }
      </>)
    },
     {
       title: '截至时间',
       dataIndex: 'cancel_at',
     },
    // {
    //   title: '操作',
    //   dataIndex: 'operations',
    //   headerCellStyle: { paddingLeft: '15px' },
    //   render: (_, record) => (
    //     <Space>
    //       {record.count_surplus>0?
    //         <Button
    //         onClick={() => {console.log(record)}
    //         }
    //         >
    //         约课
    //       </Button>:<></>}
    //     </Space>
    //   ),
    // },
  ];
}



  const [data, setData] = React.useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pagination, setPatination] = useState<PaginationProps>({
    sizeCanChange: true,
    showTotal: true,
    pageSize: 10,
    current: 1,
    pageSizeChangeResetCurrent: true
  });

  useEffect(() => {
    memberProductData();
  }, [pagination.current, pagination.pageSize,memberInfo]);

  function memberProductData() {
    const { current, pageSize } = pagination;
    const params = {
      member_id: memberInfo.id,
      page: current,
      type:type,
      pageSize,

    };
    memberService.memberPropertyList(params)
      .then((res) => {
        if (res.total===0){
          setData([]);
        }else {
          setData(res.data);
        }
        setPatination({
          ...pagination,
          current,
          pageSize,
          total: res.total,
        });
      });
  }
  function onChangeTable({ current, pageSize }) {
    setPatination({
      ...pagination,
      current,
      pageSize,
    });
  }

  return (
    <Table
      loading={loading}
      columns={columns}
      data={data}
      pagination={pagination}
      onChange={onChangeTable}
      rowSelection={{
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          console.log('selectedRowKeys', selectedRowKeys);
          console.log('selectedRows', selectedRows);
          setSelectedRowKeys(selectedRowKeys);
        },
      }}
      renderPagination={(paginationNode) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 10,
          }}
        >
          <Space>
            <span>Selected {selectedRowKeys.length}</span>
            <Button size='mini'>Save</Button>
            <Button size='mini'>Delete</Button>
          </Space>
          {paginationNode}
        </div>
      )}
    />
  );
}