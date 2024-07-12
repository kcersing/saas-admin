import React, { useState, useEffect, useMemo } from 'react';
import { Form, Select, Space } from '@arco-design/web-react';
import memberService  from '@/api/member';
import { IconFire, IconDelete } from '@arco-design/web-react/icon';
const FormItem = Form.Item;
function SelectMemberProperyList( props: { mode?: 'multiple' | 'tags'|'',members?:any,type?:string,venue?:number,memberProduct?:number,MemberProperty: any }) {
  const [list, setList] = useState([])
  useEffect(() => {
    listData();
  }, [props.memberProduct]);
  function listData() {
    memberService.memberPropertyList({
      member_product_id:props.memberProduct,
      type:props.type,
      venue_id:props.venue,
      members:props.members,
      page: 1,
      pageSize:999,
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
    <FormItem label="属性" field="member_propery" rules={[{ required: true }]}>
      <Select
        mode={props.mode}
        placeholder='选择属性'
        allowClear
        showSearch
        filterOption={(inputValue, option) =>
           option.props.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
        }
        removeIcon={<IconDelete />}
        onChange={(value) => {
          props.MemberProperty(value)
        }}
      >
        {list && list.map((option) => (
          <Option key={option.id} value={option.id}>
            {option.name}
          </Option>
        ))}
      </Select>
    </FormItem>
  )
}

export default SelectMemberProperyList;