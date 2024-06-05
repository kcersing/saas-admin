import React, { useState, useEffect, useMemo } from 'react';
import { Form, Select, Space } from '@arco-design/web-react';
import sysService from '@/api/sys';
import { IconUserAdd, IconDelete } from '@arco-design/web-react/icon';
const FormItem = Form.Item;
function SelectStaffList( props: { mode?: 'multiple' | 'tags'|'' }) {

  const [list, setList] = useState([])
  useEffect(() => {
    listData();
  }, []);
  function listData() {
    sysService.staffList()
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
    <FormItem label="员工" field="staff" rules={[{ required: false }]}>
      <Select
        style={{ width: 200, }}
        mode={props.mode}
        placeholder='选择员工'
        allowClear
        showSearch
        filterOption={(inputValue, option) =>
           option.props.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
        }
        removeIcon={<IconDelete />}
        renderFormat={(option, value) => {
          return option ? (
            <span>
              <IconUserAdd
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

export default SelectStaffList;