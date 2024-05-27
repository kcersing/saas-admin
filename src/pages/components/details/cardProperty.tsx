import { Card, Descriptions,Space } from '@arco-design/web-react';
import React from 'react';

function CardPropertyDetails(props: {
  card: any,
}){
  console.log(props)
  return <Card bordered title='卡属性' style={{ marginBottom: 20 , width: 960}}>
    {Array.isArray(props.card)?  props.card.map((item, index) => {
      let pData=[
        {
          label: '属性ID',
          value: item.id,
        },

        {
          label: '时长',
          value: item.duration,
        },
        {
          label: '价格',
          value: item.price,
        },
        {
          label: '次数',
          value: (
            item.count==0?"不限":item.count
          ),
        },
        {
          label: '场馆',
          value: (
            item.venues==""?"不限":item.venues
          ),
        },
      ];
      return <Card
        style={{  width: 920,marginBottom: 10 }}
        title={<span style={{fontSize:14}}>{item.name}</span>}
        size={'small'}
        bordered
        hoverable
      >
        <Descriptions
          column={4}
          data={pData}
          border
          colon={"："}
          labelStyle={{ paddingRight: 30 }}
        />
      </Card>
    }):""}
  </Card>
}
export default CardPropertyDetails;