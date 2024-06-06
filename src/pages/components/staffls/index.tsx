import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, Space ,Alert} from '@arco-design/web-react';
import { IconDelete, IconStar } from '@arco-design/web-react/icon';
import sysService from '@/api/sys';
import styles from './index.module.css';
function Staffs() {
  const [list, setList] = useState([]);
  useEffect(() => {
    listData();
  }, []);

  function listData() {
    sysService.staffList({})
      .then((res) => {
        if (res.total===0){
          setList([]);
        }else {
          setList(res.data);
        }
      });
  }

  const Option = Select.Option;
  const options = [10,20,30,40,50,60,70,80,90,100];
  return (
    <div  className={styles.div1}>
      <Form.Item label='销售人员'>

      <Form.List field="staffs"
      
      rules={[{
          validator(v, cb) {
            if (v.length > 0) {
              let tol = 0;
              v.map((value, index) => {
                if (value){
                  tol += value.ratio
                }
              });
            if (tol!=100){
              return cb( '员工分销之和需等于100');
            }}
            return cb();
          },
        }]}
      >

        {(fields, { add, remove, move }) => {
          return (
            <div>
              {fields.map((item, index) => {
                return (

                  <div key={item.key}>
                    <Form.Item label='员工'>
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
                            {list && list.map((option) => (
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
                        <Button icon={<IconDelete />} shape="circle" status="danger" onClick={() => remove(index)} />
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
                  添加销售员工
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
      </Form.Item>
    </div>
  );
}

export default Staffs;
