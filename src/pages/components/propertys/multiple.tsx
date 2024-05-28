import React, { useEffect, useState } from 'react';
import { Button, Form, Select, Space, Alert, InputNumber, Input, Statistic } from '@arco-design/web-react';
import { IconDelete, IconStar } from '@arco-design/web-react/icon';
import sysService from '@/api/sys';

function PropertysMultiple(props: {
  label?: string,
  field?: string,
  type?: string,
  form: any,
  product?:number,
}) {

  const [list, setList] = useState([]);
  useEffect(() => {
    listData();
  }, [props.product]);
  function listData() {
    sysService.propertyList({ 'type': props.type,'product':props.product ,})
      .then((res) => {
        setList(res.data);
      });
  }
  const Option = Select.Option;

  const [itemMoney, setItemMoney] = useState();

  if (list){
    return (
      <Form.Item label={props.label}>
        <Form.List field={props.field}>
          {(fields, { add, remove, move }) => {
            return (
              <div>
                {fields.map((item, index) => {
                  return (
                    <div key={item.key}>
                      <Form.Item>
                        <Space style={{ width: 340 }}>
                          <Form.Item
                            field={item.field + '.property'}
                            rules={[{ required: true }]}
                            noStyle >
                                <Select
                                  style={{ width: 160 }}
                                  placeholder="选择属性"
                                  allowClear
                                  showSearch
                                  filterOption={(inputValue, option) =>
                                    option.props.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
                                  }
                                  removeIcon={<IconDelete />}
                                  renderFormat={(option, value) => {
                                    return option ? (   <span> <IconStar style={{ color: '#f7ba1e' }} /> {` ${option._key}  `}   </span>   ) : (value);
                                  }}
                                  onChange={(value,option)=>{
                                    setItemMoney(option.extra);
                                    props.form.setFieldsValue({
                                      [ item.field+ '.money'] : option.extra
                                    })
                                  }}
                                >
                                  {list && list.map((option) => (
                                    <Option extra={option.key} key={option.name} value={option.id}>
                                      {option.name}
                                    </Option>
                                  ))}
                                </Select>
                              </Form.Item>

                              {
                                props.type!=='card'?(
                                  <Form.Item
                                    field={item.field + '.quantity'}
                                    rules={[{ required: true }]}
                                    noStyle>
                                    <InputNumber style={{ width: 60 }} placeholder="" />
                                  </Form.Item>
                                ):(<></>)
                              }

                              <Form.Item
                                field={item.field+ '.money'}
                                noStyle>
                                <Input hidden  />
                                <Statistic
                                  precision={2}
                                  suffix='¥'
                                  prefix='单价'
                                  value={itemMoney}
                                  styleValue={{ fontSize:14, color: '#f7ba1e'}}
                                  styleDecimal={{ fontSize:12, color: '#f7ba1e'}}
                                />
                              </Form.Item>
                            </Space>

                        <Button icon={<IconDelete />} shape="circle" status="danger" onClick={() => remove(index)} />
                      </Form.Item>
                    </div>
                  );
                })}
                <Form.Item wrapperCol={{ offset: 2 }}>
                  <Button
                    onClick={() => {
                      add();
                    }}
                  >
                    添加属性
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
      </Form.Item>
    );
  }else {
    return ("");
  }

}
export default PropertysMultiple;
