import React, { useState, useEffect, useMemo } from 'react';
import { Form, Select, Space } from '@arco-design/web-react';
import sysService from '@/api/sys';
import { IconFire, IconDelete } from '@arco-design/web-react/icon';
const FormItem = Form.Item;
function SelectProductList( props: { mode?: 'multiple' | 'tags'|'',members?:any }) {
  const [list, setList] = useState([])
  useEffect(() => {
    listData();
  }, []);
  function listData() {
    sysService.productList({
      members:props.members
    })
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
    <FormItem label="产品" field="product" rules={[{ required: true }]}>
      <Select
        mode={props.mode}
        placeholder='选择产品'
        allowClear
        showSearch
        filterOption={(inputValue, option) =>
           option.props.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
        }
        removeIcon={<IconDelete />}
        renderFormat={(option, value) => {
          return option ? (
            <span>
              <IconFire
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

export default SelectProductList;