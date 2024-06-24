import { Descriptions ,Space,Badge} from '@arco-design/web-react';
import React, { useEffect, useState } from 'react';

export default function MemberInfo({ memberInfo = {}, loading }: { memberInfo: any; loading: boolean; }) {

  useEffect(() => {
    console.log(memberInfo);
  }, [memberInfo]);

  const data = [
    {
      label: '会员ID',
      value: memberInfo.id,
    },
    {
      label: '会员账号',
      value: memberInfo.name,
    },
    {
      label: '姓名',
      value: memberInfo.nickname,
    },
    {
      label: '会员状态',
      value:
      (
        <Space size='large'>
          {memberInfo.condition===0 &&  <Badge status='default' text='未开发' />}
          {memberInfo.condition===1 &&  <Badge status='success' text='正式' />}
          {memberInfo.condition===2 &&  <Badge status='warning' text='临期' />}
          {memberInfo.condition===3 &&  <Badge status='error' text='到期' />}
        </Space>
      ),
    },

    {
      label: '手机号',
      value: memberInfo.mobile,
    },

    {
      label: '性别',
      value: memberInfo.gender,
    },
    {
      label: '年龄',
      value: memberInfo.age,
    },
    {
      label: '出生日期',
      value: memberInfo.birthday,
    },
    {
      label: '微信号',
      value: memberInfo.wecom,
    },
    {
      label: '邮箱',
      value: memberInfo.email,
    },
  ];

  const  data2 =[
    {
      label: '证件号',
      value: memberInfo.identity_card,
      span: 4
    },
    {
      label: '正面证件照片',
      value: memberInfo.face_identity_card,
      span: 2
    },
    {
      label: '反面证件照片',
      value: memberInfo.back_identity_card,
      span: 2
    },
    {
      label: '人脸特征值',
      value: memberInfo.face_eigenvalue,
      span: 4
    },
    {
      label: '人脸照片',
      value: memberInfo.face_pic,
      span: 2
    },

    {
      label: '人脸更新时间',
      value: memberInfo.face_pic_updated_time,
      span: 2
    },
  ]

  const  data3 =[

    {
      label: '消费总金额',
      value: memberInfo.money_sum,
      span: 4
    },
    {
      label: '首次购买产品',
      value: memberInfo.product_name+'('+memberInfo.product_id+')',
      span: 2
    },
    {
      label: '首次消费场馆',
      value: memberInfo.product_venue_name+'('+memberInfo.product_venue+')',
      span: 2
    },
    {
      label: '进馆总次数',
      value: memberInfo.entry_sum,
      span: 2
    },

    {
      label: '最后一次进馆时间',
      value: memberInfo.entry_last_time,
      span: 2
    },
    {
      label: '进馆最后期限时间',
      value: memberInfo.entry_deadline_time,
      span: 2
    },

    {
      label: '最后一次上课时间',
      value: memberInfo.class_last_time,
      span: 2
    },

    {
      label: '创建时间',
      value: memberInfo.createdAt,
      span: 2
    },
    {
      label: '关联会员',
      value: memberInfo.relation_mname +'('+memberInfo.relation_mid+')',
      span: 2
    },
    {
      label: '关联员工',
      value:memberInfo.relation_uname +'('+memberInfo.relation_uid+')',
      span: 2
    }
  ]

  return (
    <>
    <Descriptions
      title={'基本信息'}
      data={data}
      border
      column={{
        xs: 1,
        sm: 2,
        md: 2,
        lg: 2,
        xl: 3,
        xxl: 4
      }}
    />
      <Descriptions
        title={'认证信息'}
        data={data2}
        border
        column={{
          xs: 1,
          sm: 2,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 4
        }}
      />

      <Descriptions
        title={'系统信息'}
        data={data3}
        border
        column={{
          xs: 1,
          sm: 2,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 4
        }}
      />


    </>

  );
}