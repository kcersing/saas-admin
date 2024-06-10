import React, { useState, useEffect, useMemo, useContext } from 'react';
import { Button, Form, Input, Message, Modal, Table, Spin ,Select,Tabs,Divider,  Typography, InputNumber, Statistic } from '@arco-design/web-react';
import productService from '@/api/product';
import { IconAlipayCircle } from '@arco-design/web-react/icon';
import QRCode from 'qrcode.react';
const Option = Select.Option;
import memberService, { memberInfo } from '@/api/member';

const TabPane = Tabs.TabPane;
const style = {
  textAlign: 'center',
  marginTop: 20,
};

function getDataFromServer() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          name: 'EduTools',
          version: '12.18.1',
          author: 'Dickens',
        },
        {
          id: '2',
          name: 'BashSupport',
          version: '12.19.2',
          author: 'Aristotle',
        },
        {
          id: '3',
          name: 'GitToolBox',
          version: '12.20.3',
          author: 'Hemingway',
        },
      ]);
    }, 1500);
  });
}
// export const MemberDetailsShow=(params: object)=> {
// console.log(params)
//
//   // MemberDetails({title:'会员详情', membersInput:'a',memberSelect:""})
// };


const MemberDetails= ({Visible, visibles,memberValue,memberOption}) => {


  const [loading, setLoading] = React.useState(false); // table
  const [data, setData] = React.useState([]);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
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
      },
    },
    {
      title: 'Author',
      dataIndex: 'author',
      sorter: (a, b) => a.author.length - b.author.length,
    },
  ];

  function loadData() {
    setLoading(true);
    getDataFromServer().then((res) => {
      setData(res);
      setLoading(false);
    });
  }


  //=======================================================





  console.log(memberValue,memberOption)

  useEffect(() => {
    memberData()
    loadData();
  }, []);

  function memberData(){
   const params={
     option :memberOption,
     value :memberValue
    }
      // memberService.memberInfo(params)
      // .then((res) => {
      //   console.log(res);
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
  }


  return (
    <>
      {/*<Button type='primary' htmlType='submit' style={{height:36,marginRight: 5 }} onClick={() => setVisible(true)} icon={<IconAlipayCircle />}>{props.title}</Button>*/}
      <Modal
        focusLock={true}
        unmountOnExit={true}
        visible={visibles}
        onCancel={() => {Visible(false)}  }
        closable
        maskClosable={false}
        style={{width: 1000,height: 800,top: 20}}
        footer={null}
        getPopupContainer={()=> document.body }


        alignCenter={false}

        afterClose={() => setData([])}
    >


        <Spin tip='载入数据中...' loading={loading}>
          <div style={{ height: 266, visibility: !loading ? 'visible' : 'hidden' }}>
            <p>
              You can select multiple plugins for the current project so that our app will verify
              that the plugins are installed and enabled.
            </p>
            <p
              style={{
                marginTop: 20,
                marginBottom: 8,
                fontWeight: 600,
              }}
            >
              List of plugins
            </p>

            <Divider
              style={{
                borderBottomStyle: 'dashed',
              }}
            />

            <Tabs
              defaultActiveTab='1'
              extra={
                <Button size='small' type='secondary'>
                  行为啊啊啊
                </Button>
              }
            >
              <TabPane key='1' title='已购产品'>
                <Typography.Paragraph style={style}>Content of Tab Panel 1
                  <Table
                    columns={columns}
                    data={data}
                    pagination={false}
                    border={{
                      headerCell: true,
                      wrapper: true,
                    }}
                    rowKey='id'
                    rowSelection={{
                      type: 'checkbox',
                      checkAll: true,
                    }}
                  ></Table>

                </Typography.Paragraph>
              </TabPane>
              <TabPane key='2' title='生效中的属性' >
                <Typography.Paragraph style={style}>Content of Tab Panel 2


                  <Table
                    columns={columns}
                    data={data}
                    pagination={false}
                    border={{
                      headerCell: true,
                      wrapper: true,
                    }}
                    rowKey='id'
                    rowSelection={{
                      type: 'checkbox',
                      checkAll: true,
                    }}
                  ></Table>

                </Typography.Paragraph>
              </TabPane>
              <TabPane key='3' title='记录'>
                <Typography.Paragraph style={style}>Content of Tab Panel 3


                  <Table
                    columns={columns}
                    data={data}
                    pagination={false}
                    border={{
                      headerCell: true,
                      wrapper: true,
                    }}
                    rowKey='id'
                    rowSelection={{
                      type: 'checkbox',
                      checkAll: true,
                    }}
                  ></Table>

                </Typography.Paragraph>
              </TabPane>
            </Tabs>


          </div>
        </Spin>








      </Modal>
    </>
  );
}

export default MemberDetails;