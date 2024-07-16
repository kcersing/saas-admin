import React, { useState, useEffect, useMemo } from 'react';
import { Form, Select, Space } from '@arco-design/web-react';
import sysService from '@/api/sys';
import { IconLocation, IconDelete } from '@arco-design/web-react/icon';
const FormItem = Form.Item;
function SelectVenueList( props: { mode?: 'multiple' | 'tags'|'',Venue?: any}) {
  const [list, setList] = useState([])
  useEffect(() => {
    listData();
  }, []);
  function listData() {
    sysService.venueList({})
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
    <FormItem label="场馆" field="venue" rules={[{ required: false }]} >
      <Select
        mode={props.mode}
        style={{ width: 200, }}
        placeholder='选择场馆'
        allowClear
        showSearch
        filterOption={(inputValue, option) =>
           option.props.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
        }
        removeIcon={<IconDelete />}
        onChange={(value) => {
          props.Venue(value)
        }}
        renderFormat={(option, value) => {
          return option ? (
            <span>
              <IconLocation
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

export default SelectVenueList;