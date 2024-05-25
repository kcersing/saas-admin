import { useRef, useEffect, useState } from 'react';
import {
  Steps,
  Form,
  Input,
  Select,
  DatePicker,
  InputTag,
  Button,
  Typography,
  Space,
  Card,
  Switch,
  Result, InputNumber, Checkbox
} from '@arco-design/web-react';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import styles from './style/index.module.less';
import SelectVenueList from '@/pages/components/select/selectVenueList';
import SelectMemberList from '@/pages/components/select/selectMemberList';
import SelectStaffList from '@/pages/components/select/selectStaffList';
import SelectProductList from '@/pages/components/select/selectProductList';
import SelectContractList from '@/pages/components/select/selectContractList';
import SignPage from '@/pages/components/signature';
import Staffs from '@/pages/components/staffls';
import SelectNatureType from '@/pages/components/select/selectNatureType';
import SelectPropertyList from '@/pages/components/select/selectPropertyList';
import Propertys from '@/pages/components/propertys/multiple';

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

  const toNext = async () => {
    try {
      await form.validate();
      const values = form.getFields();
      // console.log(values);
      // console.log(signImg)

      console.log(formRef.current.getTouchedFields())
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
              title='创建订单'
              description='输入订单基本信息'
            />
            <Steps.Step
              title='支付信息'
              description='支付订单'
            />
            <Steps.Step
              title='完成订单'
              description='完成订单'
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
                <SelectMemberList mode="" />
                <Card>
                  <Propertys label="卡属性" field="cardProperty" type="card"  form={form} />
                  <Propertys label="私教课" field="courseProperty" type="course" form={form}/>
                  <Propertys label="团课" field="classProperty" type="class" form={form}/>
                </Card>

                <Form.Item label="定价" field="total" rules={[{ required: true }]}>
                  <InputNumber
                    placeholder=""
                    step={0.01}
                    precision={1} />
                </Form.Item>

                <Form.Item
                  label="激活时间"
                  required
                  field="basic.assign_at"
                  rules={[
                    {
                      required: true,
                      message: '请选择激活时间'
                    }
                  ]}
                >
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>

                <SelectContractList mode="multiple" />

<Staffs />

                <Form.Item label='会员签字'  field="basic.SignData">
                  <SignPage SignData={SignData} />
                </Form.Item>

                <Form.Item
                  required
                  field="basic.aaa"
                  rules={[
                    {
                      required: true,
                      message: '请阅读购买须知'
                    }
                  ]}
                >
                  <Checkbox> <a href="/orders/add" target="_blank">购买须知</a></ Checkbox>

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



                <Form.Item
                  label="支付方式"
                  field="pays.pay_type"
                  rules={[{ required: true }]}>
                  <Select placeholder='请选择支付方式' style={{ width: 154 }} allowClear>
                    {payType.map((option, index) => (
                      <Option key={option}  value={option}>
                        {option}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>


                <Form.Item
                  label="实付金额"
                  field="pays.pay"
                  rules={[{ required: true }]}>
                  <InputNumber
                    placeholder=""
                    step={0.01}
                    precision={1} />
                </Form.Item>
                <Form.Item
                  label="减免金额"
                           field="pays.remission"
                           rules={[{ required: true }]}>
                  <InputNumber
                    placeholder=""
                    step={0.01}
                    precision={1} />
                </Form.Item>




                <Form.Item
                  label='备注'
                  required
                  field="pays.note"
                  rules={[
                    {
                      required: true,
                      message: '请输入备注信息',
                    },
                  ]}
                >
                  <Input
                    placeholder='请输入备注信息'
                  />
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
