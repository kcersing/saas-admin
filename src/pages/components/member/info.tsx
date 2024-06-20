import React, { useState, useEffect, useMemo, useContext } from 'react';
import {
  Button,
  Form,
  Input,
  Message,
  Modal,
  Table,
  Spin,
  Card,
  Select,
  Tabs,
  Divider,
  Typography,
  Alert,
  InputNumber,
  Empty,
  Statistic
} from '@arco-design/web-react';
import productService from '@/api/product';
import { IconAlipayCircle } from '@arco-design/web-react/icon';
import QRCode from 'qrcode.react';

const Option = Select.Option;
import memberService, { memberInfo } from '@/api/member';
import { useSelector } from 'react-redux';
import InfoHeader from './header';

const TabPane = Tabs.TabPane;
const style = {
  textAlign: 'center',
  marginTop: 20
};

function getDataFromServer() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          name: 'EduTools',
          version: '12.18.1',
          author: 'Dickens'
        },
        {
          id: '2',
          name: 'BashSupport',
          version: '12.19.2',
          author: 'Aristotle'
        },
        {
          id: '3',
          name: 'GitToolBox',
          version: '12.20.3',
          author: 'Hemingway'
        }
      ]);
    }, 1500);
  });
}

const Info = ({ Visible, visibles, memberValue, memberOption }) => {

  const [loading, setLoading] = React.useState(false); // table
  const [data, setData] = React.useState([]);

  const [memberInfo, setMemberInfo] = React.useState(null);

  const [memberInfoErr, setMemberInfoErr] = React.useState('');


  useEffect(() => {
    loadData();
  }, [visibles, memberValue, memberOption]);
  console.log(visibles, memberValue, memberOption);


  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length
    },
    {
      title: 'Version',
      dataIndex: 'version',
      sorter: (a, b) => {
        const aVersion = a.version.split('.');
        const bVersion = b.version.split('.');

        for (let i = 0; i < aVersion.length; i++) {
          if (aVersion[i] === bVersion[i]) continue;
          return aVersion[i] - bVersion[i];
        }

        return 1;
      }
    },
    {
      title: 'Author',
      dataIndex: 'author',
      sorter: (a, b) => a.author.length - b.author.length
    }
  ];

  function loadData() {
    setLoading(true);

    const params = {
      option: memberOption,
      value: memberValue
    };
    memberService.memberSearch(params)
      .then((res) => {
        setMemberInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
        setMemberInfoErr(err.message);
      });

    getDataFromServer().then((res) => {
      // setData(res);

      setLoading(false);
    });
  }

  //=======================================================


  return (
    <>
      {/*<Button type='primary' htmlType='submit' style={{height:36,marginRight: 5 }} onClick={() => setVisible(true)} icon={<IconAlipayCircle />}>{props.title}</Button>*/}
      <Modal
        focusLock={true}
        unmountOnExit={true}
        visible={visibles}
        onCancel={() => {
          Visible(false);
        }}
        closable
        maskClosable={false}
        style={{ width: 1000, height: 800, top: 20 }}
        footer={null}
        getPopupContainer={() => document.body}


        alignCenter={false}

        afterClose={() => setData([])}
      >
        {console.log(memberInfo)}
        {memberInfo && (<>
            <Card style={{ padding: '14px 20px' }}>
              <InfoHeader memberInfo={memberInfo} loading={loading} />
            </Card>
            <Spin tip="载入数据中..." loading={loading}>
              <div style={{ height: '100%', visibility: !loading ? 'visible' : 'hidden' }}>
                <Divider
                  style={{
                    borderBottomStyle: 'dashed'
                  }}
                />
                <Tabs
                  style={{ height: '100%' }}
                  defaultActiveTab="1"
                  extra={
                    <Button size="small" type="secondary">
                      Active
                    </Button>
                  }
                >
                  <TabPane key="1" title="基本信息">
                    <Typography.Paragraph style={style}>
                      <Table
                        columns={columns}
                        data={data}
                        pagination={false}
                        border={{
                          headerCell: true,
                          wrapper: true
                        }}
                        rowKey="id"
                        rowSelection={{
                          type: 'checkbox',
                          checkAll: true
                        }}
                      ></Table>

                    </Typography.Paragraph>
                  </TabPane>
                  <TabPane key="2" title="我的产品">
                    <Typography.Paragraph style={style}>
                      <Table
                        columns={columns}
                        data={data}
                        pagination={false}
                        border={{
                          headerCell: true,
                          wrapper: true
                        }}
                        rowKey="id"
                        rowSelection={{
                          type: 'checkbox',
                          checkAll: true
                        }}
                      ></Table>
                    </Typography.Paragraph>
                  </TabPane>
                  <TabPane key="3" title="最新动态">
                    <Typography.Paragraph style={style}>
                      <Table
                        columns={columns}
                        data={data}
                        pagination={false}
                        border={{
                          headerCell: true,
                          wrapper: true
                        }}
                        rowKey="id"
                        rowSelection={{
                          type: 'checkbox',
                          checkAll: true
                        }}
                      ></Table>

                    </Typography.Paragraph>
                  </TabPane>
                </Tabs>
              </div>
            </Spin>
          </>)
        }

        {!memberInfo && <> <Alert style={{ marginTop: 20,marginBottom:30}} type='error' content={memberInfoErr} /><Empty /></>}
      </Modal>
    </>
  );
};

export default Info;