import React, { useState, useEffect, useMemo } from 'react';
import { Form, Select, Space } from '@arco-design/web-react';
import sysService from '@/api/sys';
import { IconFire, IconDelete } from '@arco-design/web-react/icon';
const FormItem = Form.Item;
function SelectPlaceList( props: { mode?: 'multiple' | 'tags'|'',venue?:number }) {
  const [list, setList] = useState([])
  useEffect(() => {
    listData();
  }, [props.venue]);
  function listData() {
    sysService.placeList({"venue":props.venue})
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
    <FormItem label="场地" field="place" >
      <Select
        style={{ width: 200, }}
        mode={props.mode}
        placeholder='选择场地'
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
        {list.map((option) => (
          <Option key={option.name} value={option.id}>
            {option.name}
          </Option>
        ))}
      </Select>
    </FormItem>
  )
}

export default SelectPlaceList;