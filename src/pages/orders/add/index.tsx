import React, { useRef, useEffect, useState } from 'react';
import {
  Steps,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Typography,
  Space,
  Card,
  Result, InputNumber, Checkbox, Statistic
} from '@arco-design/web-react';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import styles from './style/index.module.less';
import SelectVenueList from '@/pages/components/select/selectVenueList';
import SelectMemberList from '@/pages/components/select/selectMemberList';
import SelectContractList from '@/pages/components/select/selectContractList';
import SignPage from '@/pages/components/signature';
import Staffs from '@/pages/components/staffls';
import SelectNatureType from '@/pages/components/select/selectNatureType';
import PropertysRadio from '@/pages/components/propertys/radio';
import PropertysMultiple from '@/pages/components/propertys/multiple';
import { IconAlipayCircle } from '@arco-design/web-react/icon';
import SelectProductList from '@/pages/components/select/selectProductList';

const { Title } = Typography;
function Add() {
  const t = useLocale(locale);

  const [current, setCurrent] = useState(1);

  const [form] = Form.useForm();
  const formRef = useRef();



  const viewForm = () => {
    const values = form.getFields();
    form.setFields(values);
    console.log(values);

    setCurrent(1);
  };

  const reCreateForm = () => {
    form.resetFields();
    const values = form.getFields();
    console.log(values);

    setCurrent(1);
  };

  const payForm=()=>{
    form.resetFields();
    const values = form.getFields();
    console.log(values);
  }

  const toNext = async () => {
    try {
      await form.validate();
      const values = form.getFields();
      // console.log(values);
      // console.log(signImg)

      setCurrent(current + 1);
    } catch (_) {}
  };

  const [signImg, setSignImg] = useState('');

  const SignData = (sign) => {
    setSignImg(sign)
  }


  const Option = Select.Option;
  const payType = ['微信', '支付宝', '银联', '线下收款'];

  return (
    <div className={styles.container}>
      <Card>
        <Title heading={5}>{t['stepForm.desc.basicInfo']}</Title>
        <div className={styles.wrapper}>
          <Steps current={current} lineless>
            <Steps.Step
              title="创建订单"
              description="选择产品属性"
            />
            <Steps.Step
              title="创建订单"
              description="创建订单"
            />
            <Steps.Step
              title="生成订单"
              description="生成订单"
            />
          </Steps>
          <Form
            ref={formRef}
            form={form}
            className={styles.form}
          >
            {current === 1 && (
              <Form.Item noStyle>
                <SelectVenueList mode="" />
                <SelectNatureType mode="" />
                <SelectProductList mode="" />

                <Form.Item
                  shouldUpdate={(prev, next) =>{
                    if (prev.product !== next.product){
                      return true
                    }
                  }
                }
                  noStyle
                >
                  {(values) => {
                    form.setFieldsValue({
                      // ...option,
                      ['cardProperty'] : undefined,
                      [ 'courseProperty'] : undefined,
                      ['classProperty'] : undefined,
                    })

                      return (
                        <Card title="选择属性" >
                          <PropertysRadio label="卡属性" field="cardProperty" type="card" product={values.product} form={form} />
                          <PropertysMultiple label="私教课" field="courseProperty" type="course" product={values.product} form={form} />
                          <PropertysMultiple label="团课" field="classProperty" type="class" product={values.product} form={form} />
                        </Card>
                      );
                  }}
                </Form.Item>


                <Form.Item shouldUpdate noStyle>

                  {(values) => {


                    console.log(values);
                    let moneys = 0;
                    if (values.cardProperty !== undefined) {
                      if (values.cardProperty.property !== undefined) {

                      }
                      if (values.cardProperty.quantity !== undefined) {

                      }
                      if (values.cardProperty.money !== undefined) {

                      }


                    }

                    if (values.courseProperty !== undefined) {
                      if (values.courseProperty.length > 0) {
                        if (values.courseProperty[0] !== undefined) {
                          values.courseProperty.map((item, index) => {
                            if (item !== undefined) {
                              if (item.hasOwnProperty('money') && item.hasOwnProperty('property') && item.hasOwnProperty('quantity')) {
                                moneys += item.money * item.quantity;
                              }
                            }
                          });
                        }
                      }
                    }
                    if (values.classProperty !== undefined) {
                      if (values.classProperty.length > 0) {
                        if (values.classProperty[0] !== undefined) {
                          values.classProperty.map((item, index) => {
                            if (item !== undefined) {
                              if (item.hasOwnProperty('money') && item.hasOwnProperty('property') && item.hasOwnProperty('quantity')) {
                                moneys += item.money * item.quantity;
                              }
                            }
                          });
                        }
                      }
                    }
                    // if( values.classProperty!="undefined" && values.classProperty.length>0 && values.courseProperty[0]!="undefined" ){
                    //
                    //   console.log(values.classProperty[0].hasOwnProperty("money"))
                    // }


                    return (<Statistic
                      precision={2}
                      suffix="¥"
                      prefix="单价"
                      value={moneys}
                      styleValue={{ fontSize: 14, color: '#f7ba1e' }}
                      styleDecimal={{ fontSize: 12, color: '#f7ba1e' }}
                    />);
                  }}
                </Form.Item>


                <Form.Item label="金额" field="total">
                  <InputNumber
                    placeholder=""
                    disabled
                    step={0.01}
                    precision={1} />
                </Form.Item>

                <Form.Item
                  label="激活时间"
                  required
                  field="assign_at"
                >
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>


                {/*选择销售 sales*/}
                {/*选择会员 member_id*/}
                {/*选择产品 product_id*/}
                {/*数量 quantity*/}
                {/*合同 contract_id*/}
                {/*价格 total*/}


              </Form.Item>
            )}
            {current === 2 && (
              <Form.Item noStyle>

                <SelectMemberList mode="" />

                <Staffs />

                <SelectContractList mode="multiple" />
                <Form.Item label="会员签字" field="SignData">
                  <SignPage SignData={SignData} />
                </Form.Item>

                <Form.Item
                  required
                  field="notice"
                  rules={[
                    {
                      required: true,
                      message: '请阅读购买须知'
                    }
                  ]}
                >
                  <Checkbox> <a href="http://baidu.com" target="_blank">购买须知</a></ Checkbox>

                </Form.Item>

              </Form.Item>
            )}


            {current !== 3 ? (
              <Form.Item label=" ">
                <Space>
                  {current === 2 && (
                    <Button
                      size="large"
                      onClick={() => setCurrent(current - 1)}
                    >
                      上一步
                    </Button>
                  )}
                  {current !== 3 && (


                    <Button type="primary" size="large" onClick={toNext}>
                      下一步
                    </Button>
                  )}
                </Space>
              </Form.Item>
            ) : (
              <Form.Item noStyle>
                <Result
                  status="success"
                  title={t['stepForm.created.success.title']}
                  subTitle={t['stepForm.created.success.desc']}
                  extra={[
                    <Button
                      key="reset"
                      style={{ marginRight: 16 }}
                      onClick={viewForm}
                    >
                      {t['stepForm.created.success.view']}
                    </Button>,
                    <Button key="again" type="primary" onClick={reCreateForm}>
                      {t['stepForm.created.success.again']}
                    </Button>,
                    <Button key="again" onClick={payForm} icon={<IconAlipayCircle />}
                            style={{ marginRight: 16, marginLeft: 16 }}>
                      在线支付
                    </Button>
                  ]}
                />
              </Form.Item>
            )}
          </Form>
        </div>
      </Card>
    </div>
  );
}

export default Add;
