import React, { useState, useEffect, useMemo, useContext } from 'react';
import { Button, Form, Input, Message, Modal, Select, InputNumber, Statistic } from '@arco-design/web-react';
import productService from '@/api/product';
import { IconAlipayCircle } from '@arco-design/web-react/icon';
import QRCode from 'qrcode.react';

const Option = Select.Option;
const payType = ['微信', '支付宝', '银联', '线下收款'];
import orderService from '@/api/order';

function OrderPay(props: { orderSn?: string, total?: string }) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    console.log('');
  }, [props.total]);

  function onOk() {
    form.validate().then((res) => {
      console.log(res);
      if (res.pay_type == '线下收款') {
        const params = {
          orderSn: props.orderSn,
          pay_type: res.pay_type,
          payment: res.payment,
          remission: res.remission,
          note: res.note
        };
        console.log(params);
        setConfirmLoading(true);
        orderService.orderPay(params)
          .then((res) => {
            console.log(res);
            setVisible(false);
            setConfirmLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setConfirmLoading(true);
        setVisible(false);
        setConfirmLoading(false);
      }
    });
  }

  const formItemLayout = {
    labelCol: {
      span: 4
    },
    wrapperCol: {
      span: 20
    }
  };


  return (
    <>
      <Button key="pay" size='mini' onClick={() => setVisible(true)} icon={<IconAlipayCircle />} style={{ marginRight: 5 }}>支付</Button>

      <Modal
        focusLock={true}
        unmountOnExit
        title={
        <Statistic
          precision={2}
          suffix="¥"
          prefix="所需支付金额"
          value={props.total}
          styleValue={{ fontSize: 14, color: '#f7ba1e' }}
          styleDecimal={{ fontSize: 12, color: '#f7ba1e' }}
        />}
             visible={visible} onOk={onOk} confirmLoading={confirmLoading} onCancel={() => setVisible(false)}>
        <Form
          {...formItemLayout}
          form={form}
          labelCol={{
            style: { flexBasis: 90 }
          }}
          wrapperCol={{
            style: { flexBasis: 'calc(100% - 90px)' }
          }}
        >

          <Form.Item noStyle>


            <Form.Item
              label="支付方式"
              field="pay_type"
              rules={[{ required: true }]}>
              <Select placeholder="请选择支付方式" style={{ width: 154 }} allowClear>
                {payType.map((option, index) => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item shouldUpdate noStyle>
              {
                (values) => {

                  if (values.pay_type === '线下收款') {
                    return (
                      <>
                        <Form.Item
                          label="实付金额"
                          field="payment"
                          rules={[{ required: true }]}>
                          <InputNumber
                            placeholder=""
                            step={0.01}
                            precision={1} />
                        </Form.Item>
                        <Form.Item
                          label="减免金额"
                          field="remission"
                          rules={[{ required: true }]}>
                          <InputNumber
                            placeholder=""
                            step={0.01}
                            precision={1} />
                        </Form.Item>

                        <Form.Item
                          label="备注"
                          required
                          field="note"
                          rules={[
                            {
                              required: true,
                              message: '请输入备注信息'
                            }
                          ]}
                        >
                          <Input.TextArea
                            placeholder="请输入备注信息"
                          />
                        </Form.Item>

                      </>
                    );
                  } else if (values.pay_type === '支付宝' || values.pay_type === '微信' || values.pay_type === '银联') {

                    return (
                      <>
                        <QRCode
                          id="qrCode"
                          value="https://baidu.com"
                          size={200} // 二维码的大小
                          fgColor="#000000" // 二维码的颜色
                          style={{ margin: 'auto' }}
                          imageSettings={{ // 二维码中间的logo图片
                            src: 'logoUrl',
                            height: 100,
                            width: 100,
                            excavate: true // 中间图片所在的位置是否镂空
                          }}
                        />
                      </>
                    );
                  } else {


                    return (<></>);


                  }

                }
              }
            </Form.Item>


          </Form.Item>


        </Form>
      </Modal>
    </>
  );
}

export default OrderPay;