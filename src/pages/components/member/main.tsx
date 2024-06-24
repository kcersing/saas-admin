import React, { useEffect, useState } from 'react';
import {
  Button,
  Avatar,
  Upload,
  Descriptions,
  Tag,
  Skeleton,
  Link, Card, Spin, Divider, Tabs, Typography, Table, Alert, Empty, Space, PaginationProps
} from '@arco-design/web-react';

import MemberProductList from './table/memberProductList';
import EntryList from './table/entryList';
import MemberInfo from './table/memberInfo';


export default function Main({ memberInfo = {}, loading}: { memberInfo: any; loading: boolean; }) {
  const TabPane = Tabs.TabPane;

  return (<>
    <Spin tip="载入数据中..." loading={loading} style={{height: '100%',width:'100%',}}>
      <div style={{ height: '100%',width:'100%', visibility: !loading ? 'visible' : 'hidden' }}>
        <Divider
          style={{
            borderBottomStyle: 'dashed'
          }}
        />
        <Tabs
          style={{ height: '100%' }} defaultActiveTab="1">
          <TabPane key="1" title="会员信息">
            <Typography.Paragraph >

              <MemberInfo memberInfo={memberInfo} loading={loading} />

            </Typography.Paragraph>
          </TabPane>
          <TabPane key="2" title="我的产品">
            <Typography.Paragraph >
                <MemberProductList memberInfo={memberInfo} loading={loading} />
            </Typography.Paragraph>
          </TabPane>
          <TabPane key="3" title="进馆记录">
            <Typography.Paragraph >

              <EntryList memberInfo={memberInfo} loading={loading} />

            </Typography.Paragraph>
          </TabPane>
        </Tabs>
      </div>
    </Spin>
  </>);
}
