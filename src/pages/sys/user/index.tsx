import React, { useState, useEffect, useMemo } from 'react';
import {
  Table,
  Card,
  PaginationProps,
  Button,
  Space,
  Typography
} from '@arco-design/web-react';
import PermissionWrapper from '@/components/PermissionWrapper';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import { getColumns } from './constants';
import userService from '@/api/user';
import SearchForm from './form';
import { IconDownload, IconPlus } from '@arco-design/web-react/icon';
import styles from './style/index.module.less';
import Create from './create';

// ======================================

const { Title } = Typography;
export const ContentType = ['有进馆', '有私教课', '有团课','无进馆', '无私教课', '无团课'];
export const FilterType = ['规则筛选', '人工'];
export const Status = ['禁用', '可用'];

function User() {
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
    userService.userList(params)
      .then((res) => {
        setData(res.data);
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
  const Reload = (r) => {
    if(r){
      fetchData();
    }
  }
  return (
    <Card>
      <Title heading={6}>用户列表</Title>
      <SearchForm onSearch={handleSearch} />
      <PermissionWrapper>
        <div className={styles['button-group']}>
          <Space>
            <Create Reload={Reload}/>
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
      />



    </Card>
  );


}

export default User;