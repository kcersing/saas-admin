import React, { useEffect, useState } from 'react';
import { Button, Form, Select, Space, Alert, InputNumber, Input, Statistic } from '@arco-design/web-react';
import { IconDelete, IconStar } from '@arco-design/web-react/icon';
import sysService from '@/api/sys';

function PropertysRadio(props: {
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
    sysService.propertyList({ 'type': props.type,'product_id':props.product })
      .then((res) => {
        setList(res.data);
      });
  }

  const Option = Select.Option;

  const [itemMoney, setItemMoney] = useState();

  return (
    <Form.Item label={props.label} field={props.field}>
        <Space style={{ width: 300 }}>
          <Form.Item
            field={props.field + '.property'}
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
                return option ? (<span> <IconStar style={{ color: '#f7ba1e' }} /> {` ${option._key} `}</span>) : (value);
              }}
              onChange={(value,option)=>{
                if(option && option.extra ){
                  setItemMoney(option.extra);
                  props.form.setFieldsValue({
                    // ...option,
                    [props.field+'.money'] : option.extra
                  })
                }
              }}
              onClear={visible => {
                props.form.setFieldsValue({
                  // ...option,
                  [props.field+'.money'] : 0,
                  [props.field+'.quantity'] : 0
                })
                setItemMoney("0");
              }}
            >
              {list && list.map((option) => (
                <Option extra={option.key} key={option.name} value={option.id}>
                  {option.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {props.type !== 'card'?(
              <Form.Item
                field={props.field + '.quantity'}
                rules={[{ required: true }]}
                noStyle
              >
                <InputNumber style={{ width: 60 }} placeholder="" />
              </Form.Item>
            ):("")
          }


          <Form.Item
            field={props.field + '.money'}
            noStyle>
            <Input hidden />
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

    </Form.Item>
  );
}

export default PropertysRadio;
