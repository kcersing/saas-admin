import React, { useState, useEffect, useMemo } from 'react';
import {
  Table,
  Card,
  PaginationProps,
  Button,
  Space,
  Typography,
  Empty
} from '@arco-design/web-react';
import PermissionWrapper from '@/components/PermissionWrapper';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import { getColumns } from './constants';
import productService from '@/api/product';
import SearchForm from './form';
import { IconDownload } from '@arco-design/web-react/icon';
import styles from './style/index.module.less';
import Create from './create';
// ======================================

const { Title } = Typography;
export const Status = ['可用','禁用'];

function Property() {
  const t = useLocale(locale);
  const tableCallback = async (record, type) => {

    console.log(record, type);
  };
  const columns = useMemo(() => getColumns(t, tableCallback), [t]);
  const [data, setData] = useState([]);

  const [pagination, setPatination] = useState<PaginationProps>({
    sizeCanChange: true,
    showTotal: true,
    pageSize: 10,
    current: 1,
    pageSizeChangeResetCurrent: true
  });
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
      });
  }


  function onChangeTable({ current, pageSize }) {
    setPatination({
      ...pagination,
      current,
      pageSize,
    });
  }
  function handleSearch(params) {
    setPatination({ ...pagination, current: 1 });
    setFormParams(params);
  }
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const Reload = (r) => {
    console.log(r)
    if(r){
      fetchData();
    }
  }
  return (
    <Card>
      <Title heading={6}>属性列表</Title>
      <SearchForm onSearch={handleSearch} />
      <PermissionWrapper>
        <div className={styles['button-group']}>
          <Space>
            <Create Reload={Reload} />
            <Button onClick={(e)=>{fetchData();}}>刷新列表</Button>
            {/*<Button>导入</Button>*/}
          </Space>
          <Space>
            {/*<Button icon={<IconDownload />}>下载</Button>*/}
          </Space>
        </div>
      </PermissionWrapper>
      <Table
        rowKey="id"
        loading={loading}
        onChange={onChangeTable}
        pagination={pagination}
        columns={columns}
        data={data}
        virtualized
        noDataElement={(<Empty />)}
        placeholder={(<Empty />)}
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
              <span>选中 {selectedRowKeys.length}</span>
              {/*<Button size='mini'>Save</Button>*/}
              <Button size='mini'>删除</Button>
            </Space>
            {paginationNode}
          </div>
        )}
      />

    </Card>
  );


}

export default Property;