import { Button, PaginationProps, Space, Table, Tabs } from '@arco-design/web-react';
import React, { useEffect, useState } from 'react';
import memberService, { memberContractList } from '@/api/member';


export default function ContractsList({ memberInfo = {}, loading}: { memberInfo: any; loading: boolean; }) {
  const columns = [
    {
      title: '合同',
      dataIndex: 'name',
      // sorter: (a, b) => a.entry_time.length - b.entry_time.length
    },
    {
      title: '签约场馆',
      dataIndex: 'venue_name',
    },
    {
      title: '签约产品',
      dataIndex: 'member_product_name',
    },
    {
      title: '签名',
      dataIndex: 'sign_img',
    },
    {
      title: '查看内容',
      dataIndex: '-',
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => {console.log(record)}
            }
          >
            查看
          </Button>
        </Space>
      ),
    },
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
    entryListData();
  }, [pagination.current, pagination.pageSize,memberInfo]);

  function entryListData() {
    const { current, pageSize } = pagination;
    const params = {
      member_id: memberInfo.id,
      page: current,
      pageSize,

    };
    memberService.memberContractList(params)
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