import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, Space } from '@arco-design/web-react';
import { IconDelete, IconStar } from '@arco-design/web-react/icon';
import sysService from '@/api/sys';

function Staffs() {
  const [list, setList] = useState([]);
  useEffect(() => {
    listData();

  }, []);

  function listData() {
    sysService.staffList()
      .then((res) => {
        setList(res.data);
      });
  }

  const Option = Select.Option;
  const options = [10,20,30,40,50,60,70,80,90,100];
  return (
    <>
      <Form.List field="staffs">

        {(fields, { add, remove, move }) => {
          return (
            <div>
              {fields.map((item, index) => {
                return (

                  <div key={item.key}>
                    <Form.Item label='销售'>
                      <Space  style={{ width: 120 }}>
                        <Form.Item
                          field={item.field + '.id'}
                          rules={[{ required: true }]}
                          noStyle
                        >
                          <Select
                            placeholder="选择员工"
                            allowClear
                            showSearch
                            filterOption={(inputValue, option) =>
                              option.props.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
                            }
                            removeIcon={<IconDelete />}
                            renderFormat={(option, value) => {
                              return option ? (
                                <span>
                                <IconStar style={{ color: '#f7ba1e' }} />
                                 {` ${option._key}  `}
                                </span>
                              ) : (value);
                            }}
                          >
                            {list.map((option) => (
                              <Option key={option.name} value={option.id}>
                                {option.name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item field={item.field + '.ratio'} rules={[{ required: true }]} noStyle>
                          <Select  style={{ width: 80 }} >
                            {options.map((option, index) => (
                              <Option key={option}  value={option}>
                                {option}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        {!!index &&  <Button icon={<IconDelete />} shape="circle" status="danger" onClick={() => remove(index)} />}
                      </Space>
                    </Form.Item>
                  </div>
                );
              })}
              <Form.Item wrapperCol={{ offset: 5 }}>
                <Button
                  onClick={() => {
                    add();
                  }}
                >

                  追加销售员工
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>

    </>
  );
}

export default Staffs;
