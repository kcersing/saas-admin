import React, { useEffect, useState } from 'react';
import { Form, Select, Space, Alert, InputNumber,Input ,Statistic} from '@arco-design/web-react';
import { IconDelete, IconStar } from '@arco-design/web-react/icon';
import sysService from '@/api/sys';

function Selects(props: {
  type?: string,
  item?: any,
  remove?:  (index: number) => void,
  index?: number,
  form: any,
}) {
  const [list, setList] = useState([]);
  useEffect(() => {
    listData();
  }, []);
  function listData() {
    sysService.propertyList(props.type)
      .then((res) => {
        setList(res.data);
      });
  }
  props.item.vss = 0;
  const Option = Select.Option;

  const [item, setItem] = useState();

  return (

    <Space style={{ width: 300 }}>
          <Form.Item
            field={props.item.field + '.property'}
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
                // setValue1(option.extra)
                setItem(option.extra);

                props.form.setFieldsValue({
                  // ...option,
               [ props.item.field+ '.money'] : option.extra
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
          field={props.item.field + '.quantity'}
          rules={[{ required: true }]}
          noStyle>
          <InputNumber style={{ width: 60 }} placeholder="" />
        </Form.Item>
      ):(<></>)
      }

      <Form.Item
        field={props.item.field + '.money'}
        hidden
        noStyle>
        <Input hidden  />
      </Form.Item>

        <Statistic
          precision={2}
          suffix='¥'
          prefix='单价'
          value={item}
          styleValue={{ fontSize:14, color: '#f7ba1e'}}
          styleDecimal={{ fontSize:12, color: '#f7ba1e'}}
        />
      </Space>

  );
}

export default Selects;
