import React, { useState, useEffect, useMemo, createContext } from 'react';
import { Select, Form } from '@arco-design/web-react';
import sysService from '@/api/sys';
const FormItem = Form.Item;
function SelectPropertyType() {

  const [list, setList] = useState([])
  useEffect(() => {
    listData();
  }, []);
  function listData() {
    sysService.propertyType()
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

    <FormItem label="类型" field="type" rules={[{ required: false }]}>

    <Select>
      {list.map((option) => (
        <Option key={option.name} value={option.id}>
          {option.name}
        </Option>
      ))}
  </Select>
    </FormItem>
  )
}

export default SelectPropertyType;