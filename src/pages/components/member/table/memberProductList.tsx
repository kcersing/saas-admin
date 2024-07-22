import { Button, PaginationProps, Space, Table, Tabs } from '@arco-design/web-react';
import React, { useEffect, useState } from 'react';
import memberService from '@/api/member';


export default function MemberProductList({ memberInfo = {}, loading}: { memberInfo: any; loading: boolean; }) {
  const columns = [
    {
      title: '产品名称',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length
    },
    {
      title: '编号',
      dataIndex: 'sn',
    },
    {
      title: '归属场馆',
      dataIndex: 'venue_name',
    },
    {
      title: '价格',
      dataIndex: 'price',
    },
    {
      title: '状态',
      dataIndex: 'status_name',
    },
    // {
    //   title: '操作',
    //   dataIndex: 'operations',
    //   headerCellStyle: { paddingLeft: '15px' },
    //   render: (_, record) => (
    //     <Space>
    //       <Button
    //         onClick={() => {console.log(record)}
    //         }
    //       >
    //       </Button>
    //     </Space>
    //   ),
    // },
  ];

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
      pageSize,

    };
    memberService.memberProductList(params)
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