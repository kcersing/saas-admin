import React, { useState, useEffect, useMemo } from 'react';
import { Form, Select, Space } from '@arco-design/web-react';
import sysService from '@/api/sys';
import { IconStar, IconDelete } from '@arco-design/web-react/icon';
const FormItem = Form.Item;
function SelectVenueList() {

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
  const Option = Select.Option;
  return (
    <FormItem label="场馆" field="venue" rules={[{ required: false }]}>
      <Select
        mode='multiple'
        placeholder='选择场馆'
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

export default SelectVenueList;