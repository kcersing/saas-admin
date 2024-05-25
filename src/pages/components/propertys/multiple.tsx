import React, { useEffect, useState } from 'react';
import { Button, Form, Select, Space, Alert, InputNumber,Input } from '@arco-design/web-react';
import { IconDelete, IconStar } from '@arco-design/web-react/icon';
import sysService from '@/api/sys';
import styles from './index.module.css';
import Selects from '@/pages/components/propertys/select';

function PropertysMultiple(props: {
  label?: string,
  field?: string,
  type?: string,
  form: any,
  product?:number,
}) {

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
                          <Selects item={item} type={props.type}  form={props.form}/>
                          <Button icon={<IconDelete />} shape="circle" status="danger" onClick={() => remove(index)} />
                      </Form.Item>
                    </div>
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
export default PropertysMultiple;
