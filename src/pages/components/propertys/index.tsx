import React, { useEffect, useState } from 'react';
import { Button, Form, Select, Space, Alert, InputNumber,Input } from '@arco-design/web-react';
import { IconDelete, IconStar } from '@arco-design/web-react/icon';
import sysService from '@/api/sys';
import styles from './index.module.css';
import Selects from '@/pages/components/propertys/select';

function Index(props: {
  label?: string,
  field?: string,
  type?: string,
}) {
  const [list, setList] = useState([]);
  useEffect(() => {
    listData();
  }, []);

  function listData() {
    sysService.propertyList(props.type)
      .then((res) => {
        setList(res.data);
      });
  }

  const Option = Select.Option;


  const [value1, setValue1] = useState<string | number>('');
  return (
      <Form.Item label={props.label}>
        <Form.List field={props.field}>

          {(fields, { add, remove, move }) => {
            return (
              <div>
                {fields.map((item, index) => {
                  return (
                    <div key={item.key}>
                      <Form.Item>

                          <Selects item={item} type={props.type} />
                          <Button icon={<IconDelete />} shape="circle" status="danger" onClick={() => remove(index)} />

                      </Form.Item>
                    </div>

                    // <div key={item.key}>
                    //   <Form.Item>
                    //     <Space style={{ width: 120 }}>
                    //       <Form.Item
                    //         field={item.field + '.property'}
                    //         rules={[{ required: true }]}
                    //         noStyle
                    //       >
                    //         <Select
                    //           style={{ width: 160 }}
                    //           placeholder="选择属性"
                    //           allowClear
                    //           showSearch
                    //           filterOption={(inputValue, option) =>
                    //             option.props.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
                    //           }
                    //           removeIcon={<IconDelete />}
                    //           renderFormat={(option, value) => {
                    //             return option ? (
                    //               <span>
                    //                 <IconStar style={{ color: '#f7ba1e' }} />
                    //                 {` ${option._key}  `}
                    //              </span>
                    //             ) : (value);
                    //           }}
                    //           onChange={(value,option)=>{
                    //           console.log(option)
                    //
                    //           }}
                    //         >
                    //           {list.map((option) => (
                    //             <Option extra={option.key} key={option.name} value={option.id}>
                    //               {option.name}
                    //             </Option>
                    //           ))}
                    //         </Select>
                    //       </Form.Item>
                    //       <Form.Item
                    //         field={item.field + '.quantity'}
                    //         rules={[{ required: true }]}
                    //         noStyle>
                    //         <InputNumber style={{ width: 60 }} placeholder="" />
                    //       </Form.Item>
                    //
                    //
                    //       <Form.Item
                    //         field={item.field + '.money'}
                    //         disabled={true}
                    //         shouldUpdate
                    //         noStyle
                    //         style={{ width: 60 }}
                    //       >
                    //
                    //         <InputNumber style={{ width: 60 }} />
                    //       </Form.Item>
                    //
                    //       <Button icon={<IconDelete />} shape="circle" status="danger" onClick={() => remove(index)} />
                    //     </Space>
                    //   </Form.Item>
                    // </div>
                  );
                })}
                <Form.Item wrapperCol={{ offset: 2 }}>
                  <Button
                    onClick={() => {
                      add();
                    }}
                  >
                    添加属性
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
      </Form.Item>
  );
}

export default Index;
