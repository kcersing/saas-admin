import React, { useState, useEffect, useMemo } from 'react';
import { Form, Select, Space } from '@arco-design/web-react';
import memberService  from '@/api/member';
import { IconFire, IconDelete } from '@arco-design/web-react/icon';
const FormItem = Form.Item;
function SelectMemberProperyList( props: { mode?: 'multiple' | 'tags'|'',members?:any,type?:string,venue?:number,memberProduct?:number,MemberProperty: any,Property: any, }) {
  const [list, setList] = useState([])
  useEffect(() => {
    if (props.members>0 && props.memberProduct>0){
      listData();
    }
  }, [props.members,props.memberProduct,props.venue]);
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
        onChange={(value, option) => {
          props.MemberProperty(value)
          props.Property(option.extra)
        }}

      >
        {list && list.map((option) => (
          <Option key={option.id} value={option.id} extra={option.property_id}>
            {option.name}
          </Option>
        ))}
      </Select>
    </FormItem>
  )
}

export default SelectMemberProperyList;