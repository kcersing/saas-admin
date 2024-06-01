import {Button, Grid, Typography, Card, Divider, DatePicker } from '@arco-design/web-react';
import dayjs from 'dayjs';
import scheduleService, { scheduleDateList } from '@/api/schedule';
import weekday from 'dayjs/plugin/weekday';

import 'dayjs/locale/zh-cn';
import { useEffect, useState } from 'react';
import { IconPlus } from '@arco-design/web-react/icon';
import Create from './create';
import productService from '@/api/product';

const Row = Grid.Row;
const Col = Grid.Col;
export default function Schedule() {
  dayjs.extend(weekday);
  dayjs.locale('zh-cn');
  const events = [
    // 你的事件数据
  ];
  const { WeekPicker } = DatePicker;
  const day = dayjs();
  const week = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
  let ws = w();

  const thisWeek = {
    'startTime': dayjs().startOf('week').format('YYYY-MM-DD'),
    'endTime': dayjs().endOf('week').format('YYYY-MM-DD')
  };
  useEffect(() => {
    scheduleDateList(thisWeek);
  }, []);

  function w() {
    let wk = [];
    for (let day = 0; day < 7; day++) {
      wk.push({
        'week': week[day],
        'day': dayjs().startOf('week').add(+day, 'day').format('YYYY-MM-DD')
      });
    }
    return wk;
  }

  const [weeks, setWeeks] = useState(ws);
  const [data, setData] = useState([]);

  function scheduleDateList(params) {
    scheduleService.scheduleDateList(params)
      .then((res) => {
        if (res.total === 0) {
          setData([]);
        } else {
          setData(res.data);
        }
      });
  }

  function onSelect(dateString, date) {
    console.log(data);
  }

  function onChange(dateString, date) {
    let w = [];
    for (let day = 0; day < 7; day++) {
      w.push({
        'week': week[day],
        'day': date.startOf('week').add(+day, 'day').format('YYYY-MM-DD')
      });
    }
    setWeeks(w);

    let dates = {
      'startTime': date.startOf('week').format('YYYY-MM-DD'),
      'endTime': date.endOf('week').format('YYYY-MM-DD')
    };
    scheduleDateList(dates);
  }

  return (
    <div style={{ width: '100%' }}>
      <Card>
        <Divider orientation="left">
          <WeekPicker
            defaultValue={day.format('YYYY-MM-DD')}
            dayStartOfWeek={1}
            onSelect={onSelect}
            onChange={onChange}
            style={{ width: 200 }}
          />
          <Divider type="vertical" />

          发布
          <Divider type="vertical" />
          <Button onClick={(e)=>{scheduleDateList(thisWeek)}}>刷新列表</Button>
        </Divider>
        <Row className="grid-gutter-demo"
             style={{ marginBottom: 16, backgroundColor: 'var(--color-fill-2)' }}
        >

          {weeks.map((day, index) => (
            <Col flex="13.5%" key={index} style={{ marginLeft: 10 }}>
              <Card style={{ marginBottom: 10, marginTop: 10 }}>
                <Typography.Text>{day.day}{day.week}</Typography.Text>
                <Card>
                  <IconPlus />
                  <Create date={day.day}/>
                </Card>
              </Card>

              <Card style={{ marginBottom: 16 }}>
                <Card>    {day.day} </Card>
                <Card>   {day.day}  </Card>
              </Card>

              {/*{ events.map((event, eventIndex) => {*/}
              {/*  return (<>1111111111111111</>);*/}
              {/*}) }*/}
              {/*/!* ... *!/*/}
            </Col>
          ))}


        </Row>
      </Card>
    </div>
  )
    ;
}