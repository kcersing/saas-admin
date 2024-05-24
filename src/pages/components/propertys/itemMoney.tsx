import {  Form, Statistic } from '@arco-design/web-react';

function ItemMoney(props: {
  item?: any,
  money?: string,
}) {

  return (
    <Form.Item
      field={props.item.field + '.money'}
      disabled
      noStyle
      shouldUpdate
      initialValue={props.money}
      style={{ width: 60 }}
    >
      <Statistic
        precision={2}
        suffix='¥'
        prefix='单价'
        styleValue={{ fontSize:14, color: '#f7ba1e'}}
        styleDecimal={{ fontSize:12, color: '#f7ba1e'}}
      />
    </Form.Item>

  );
}

export default ItemMoney;
