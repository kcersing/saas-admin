import { Button, PaginationProps, Space, Table, Tabs } from '@arco-design/web-react';
import React, { useEffect, useState } from 'react';
import scheduleService from '@/api/schedule';

export default function ScheduleList({ memberInfo = {}, loading}: { memberInfo: any; loading: boolean; }) {
  const columns = [
    {
      title: '场馆',
      dataIndex: 'venue_name',
      // sorter: (a, b) => a.entry_time.length - b.entry_time.length
    },
    {
      title: '课程名称',
      dataIndex: 'schedule_name',
    },
    {
      title: '产品名称',
      dataIndex: 'member_product_name',
    },
    {
      title: '属性名称',
      dataIndex: 'member_product_property_name',
    },
    {
      title: '课程时间',
      dataIndex: '-',
      render: (_, record) => (
        <Space>
          {record.start_time} - {record.end_time}
        </Space>
      ),
    },

    {
      title: '签到时间',
      dataIndex: '-',
      render: (_, record) => (
        <Space>
          {record.sign_start_time} - {record.sign_end_time}
        </Space>
      ),
    },

    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '操作',
      dataIndex: 'operations',
      headerCellStyle: { paddingLeft: '15px' },
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => {console.log(record)}
            }
          >
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
      member: memberInfo.id,
      page: current,
      pageSize,

    };
    scheduleService.getScheduleMemberList(params)
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