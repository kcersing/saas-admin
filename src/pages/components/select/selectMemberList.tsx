import React, { useState, useEffect, useMemo } from 'react';
import { Form, Select, Space } from '@arco-design/web-react';
import sysService from '@/api/sys';
import { IconUser, IconDelete } from '@arco-design/web-react/icon';
const FormItem = Form.Item;
function SelectMemberList( props: { mode?: 'multiple' | 'tags'|'' }) {
  const [list, setList] = useState([])
  useEffect(() => {
    listData();
  }, []);
  function listData() {
    sysService.memberList({})
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
    <FormItem label="会员" field="member" rules={[{ required: false }]}>
      <Select
        mode={props.mode}
        placeholder='选择会员'
        allowClear
        showSearch
        filterOption={(inputValue, option) => {
          return  option.props.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0 || option.props.extra.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
        }}
        removeIcon={<IconDelete />}
        renderFormat={(option, value) => {
          return option ? (
            <span>
              <IconUser
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
          <Option key={option.name} extra={option.key} value={option.id}>
            {option.name}
          </Option>
        ))}
      </Select>
    </FormItem>
  )
}

export default SelectMemberList;