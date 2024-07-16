import React, { useState, useEffect, useMemo } from 'react';
import { Form, Select, Space } from '@arco-design/web-react';
import memberService  from '@/api/member';
import { IconFire, IconDelete } from '@arco-design/web-react/icon';
const FormItem = Form.Item;
function SelectMemberProductList( props: { mode?: 'multiple' | 'tags'|'',members?:any,type?:string,venue?:number ,MemberProduct: any}) {
  const [list, setList] = useState([])
  useEffect(() => {
    if (props.members>0){
      listData();
    }
  }, [props.members,props.venue]);
  function listData() {
    memberService.memberProductList({
      members:props.members,
      venue_id:props.venue,
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
    <FormItem label="产品" field="member_product" rules={[{ required: true }]}>
      <Select
        mode={props.mode}
        placeholder='选择产品'
        allowClear
        showSearch
        filterOption={(inputValue, option) =>
           option.props.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
        }
        removeIcon={<IconDelete />}
        onChange={(value) => {
          props.MemberProduct(value)
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

export default SelectMemberProductList;