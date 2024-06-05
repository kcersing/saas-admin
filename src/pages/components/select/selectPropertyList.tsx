import React, { useState, useEffect, useMemo } from 'react';
import { Form, Select, Space } from '@arco-design/web-react';
import sysService from '@/api/sys';
import { IconStar, IconDelete } from '@arco-design/web-react/icon';
const FormItem = Form.Item;
function SelectPropertyList( props: { mode?: 'multiple' | 'tags'|'' ,label?:string,field?:string,type?:string,venue?:number}) {
  const [list, setList] = useState([])
  useEffect(() => {
    listData();
  }, [props.venue,props.type]);
  function listData() {
    sysService.propertyList({ venue:props.venue,type:props.type})
      .then((res) => {
        if (res.total===0){
          setList([]);
        }else {
          setList(res.data);
        }
      });
  }
  const Option = Select.Option;
  return (
    <FormItem label={props.label} field={props.field}  rules={[{ required: false }]}>
      <Select
        style={{ width: 200, }}
        mode={props.mode}
        placeholder={'选择'+props.label}
        allowClear
        showSearch
        filterOption={(inputValue, option) =>
           option.props.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
        }
        removeIcon={<IconDelete />}
        renderFormat={(option, value) => {
          return option ? (
            <span>
              <IconStar
                style={{
                  color: '#f7ba1e',
                }}
              />
              {` ${option._key}  `}
            </span>
          ) : (
            value
          );
        }}
      >
        {list && list.map((option) => (
          <Option key={option.name} value={option.id}>
            {option.name}
          </Option>
        ))}
      </Select>
    </FormItem>
  )
}

export default SelectPropertyList;