import React, { useState, useEffect, useMemo, createContext } from 'react';
import { Select, Form } from '@arco-design/web-react';
import sysService from '@/api/sys';
const FormItem = Form.Item;
function SelectPropertyType() {

  const [propertyType, setPropertyType] = useState([])

  useEffect(() => {
    propertyTypeData();
  }, []);

  function propertyTypeData() {
    sysService.propertyType()
      .then((res) => {
        setPropertyType(res.data);
      });
  }


  const Option = Select.Option;

  return (

    <FormItem label="类型" field="type" rules={[{ required: false }]}>

    <Select>
      {propertyType.map((option) => (
          <Option key={option.id} value={option.id}>
        {option.title}
        </Option>
      ))}
  </Select>
    </FormItem>
  )
}

export default SelectPropertyType;