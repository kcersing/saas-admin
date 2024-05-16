import React, { useState, useEffect, useMemo } from 'react';
import { Form, Select, Space } from '@arco-design/web-react';
import sysService from '@/api/sys';
import { IconStar, IconDelete } from '@arco-design/web-react/icon';
const FormItem = Form.Item;
function SelectMemberList( props: { mode?: 'multiple' | 'tags'|'' }) {

  const [venueList, setVenueList] = useState([])

  useEffect(() => {
    venueData();
  }, []);
  function venueData() {
    const data = [];
    sysService.venueData()
      .then((res) => {
          res.data.map(function (n) {
            data.push({
              label: n.name,
              value: n.name,
              key:n.id,
            } )
        })
        setVenueList(data);
      });
  }
  console.log(props)
  const Option = Select.Option;
  return (
    <FormItem label="会员" field="member" rules={[{ required: false }]}>
      <Select
        mode={props.mode}
        placeholder='选择会员'
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
        {venueList.map((option) => (
          <Option key={option.value} value={option.key}>
            {option.label}
          </Option>
        ))}
      </Select>
    </FormItem>
  )
}

export default SelectMemberList;