import React, { useEffect, useState } from 'react';
import { Button, Form, Select, Space, Alert, InputNumber, Input, Statistic } from '@arco-design/web-react';
import { IconDelete, IconStar } from '@arco-design/web-react/icon';
import sysService from '@/api/sys';
import styles from './index.module.css';
import Selects from '@/pages/components/propertys/select';

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
  }, []);

  console.log( props.product )
  function listData() {
    sysService.propertyList(props.type)
      .then((res) => {
        setList(res.data);
      });
  }

  const Option = Select.Option;

  const [item, setItem] = useState();

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
                  setItem(option.extra);
                  props.form.setFieldsValue({
                    // ...option,
                    [props.field+'.money'] : option.extra
                  })
                }
              }}
              onClear={visible => {
                setItem("0");
                props.form.setFieldsValue({
                  // ...option,
                  [props.field+'.money'] : 0,
                  [props.field+'.quantity'] : 0
                })
              }}
            >
              {list.map((option) => (
                <Option extra={option.key} key={option.name} value={option.id}>
                  {option.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {
            props.type!=='card'?(
              <Form.Item
                field={props.field + '.quantity'}
                rules={[{ required: true }]}
                noStyle
              initialValue={0}
              >
                <InputNumber style={{ width: 60 }} placeholder="" />
              </Form.Item>
            ):(<Form.Item
              field={props.field + '.quantity'}
              initialValue={1}
              hidden
              noStyle>
              <InputNumber hidden placeholder="" />
            </Form.Item>)
          }

          <Form.Item
            field={props.field + '.money'}
            hidden
            noStyle>
            <Input hidden />
          </Form.Item>
          {item===0?(    <Statistic
            precision={2}
            suffix='¥'
            prefix='单价'
            value={0}
            styleValue={{ fontSize:14, color: '#f7ba1e'}}
            styleDecimal={{ fontSize:12, color: '#f7ba1e'}}
          />):(    <Statistic
            precision={2}
            suffix='¥'
            prefix='单价'
            value={item}
            styleValue={{ fontSize:14, color: '#f7ba1e'}}
            styleDecimal={{ fontSize:12, color: '#f7ba1e'}}
          />)}


        </Space>

    </Form.Item>
  );
}

export default PropertysRadio;
