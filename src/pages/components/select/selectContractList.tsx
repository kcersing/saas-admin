import React, { useState, useEffect, useMemo } from 'react';
import { Form, Select, Space } from '@arco-design/web-react';
import sysService, { contractList } from '@/api/sys';
import { IconStar, IconDelete } from '@arco-design/web-react/icon';
const FormItem = Form.Item;
function SelectContractList( props: { mode?: 'multiple' | 'tags'|'' }) {
  const [list, setList] = useState([])
  useEffect(() => {
    listData();
  }, []);
  function listData() {
    sysService.contractList()
      .then((res) => {
        if (res.data.length>0){
          setList(res.data);
        }
      });
  }

  const Option = Select.Option;
  return (
    <FormItem label="合同" field="contract" rules={[{ required: false }]}>
      <Select
        mode={props.mode}
        placeholder='选择合同'
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
        {list.map((option) => (
          <Option key={option.name} value={option.id}>
            {option.name}
          </Option>
        ))}
      </Select>
    </FormItem>
  )
}

export default SelectContractList;