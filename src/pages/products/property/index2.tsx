import React, { useState, useEffect } from 'react';
import { Table, Space, Button, PaginationProps } from '@arco-design/web-react';
import productService from '@/api/product';
const columns = [
  {
    title: '类型',
    dataIndex: 'type',
  },
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '定价',
    dataIndex: 'price',
  },
  {
    title: '总时长',
    dataIndex: 'duration',
  },
  {
    title: '单次时长',
    dataIndex: 'length',
  },
  {
    title: '次数',
    dataIndex: 'count',
  },
  {
    title: '场馆',
    dataIndex: 'venues',
  },
];


function Property() {
  const [data, setData] = useState([]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pagination, setPagination] = useState({
    sizeCanChange: true,
    showTotal: true,
    total: 96,
    pageSize: 10,
    current: 1,
    pageSizeChangeResetCurrent: true,
  });

  const [loading, setLoading] = useState(false);
  const [formParams, setFormParams] = useState({});
  useEffect(() => {
    fetchData();
  }, [pagination.current, pagination.pageSize, JSON.stringify(formParams)]);

  function fetchData() {
    const { current, pageSize } = pagination;
    setLoading(true);
    const params = {
      page: current,
      pageSize,
      ...formParams
    };
    productService.propertyList(params)
      .then((res) => {
        setData(res.data);
        setFormParams({
          ...pagination,
          current,
          pageSize,
          total: res.total,
        });
        setLoading(false);
      });
  }

  function onChangeTable({ current, pageSize }) {
    setPagination({
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

export default Property;