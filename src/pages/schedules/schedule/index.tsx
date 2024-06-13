import { Button, Grid, Typography, Card, Divider, DatePicker, Descriptions, Select } from '@arco-design/web-react';
import dayjs from 'dayjs';
import scheduleService from '@/api/schedule';
import weekday from 'dayjs/plugin/weekday';
import 'dayjs/locale/zh-cn';
import React, { useEffect, useState } from 'react';
import {
  IconLocation,
  IconDelete
} from '@arco-design/web-react/icon';
import Create from './create';
import Details from './details';
import sysService from '@/api/sys';


const Row = Grid.Row;
const Col = Grid.Col;
export default function Schedule() {
  dayjs.extend(weekday);
  dayjs.locale('zh-cn');
  const day = dayjs();
  const { WeekPicker } = DatePicker;
  const week = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
  let ws = w();
  const [weeks, setWeeks] = useState(ws);

  const [lists, setLists] = useState([]);
  function scheduleDateList(params) {
    console.log(params)
    scheduleService.scheduleDateList(params)
      .then((res) => {
        if (res.total === 0) {
          setLists([]);
        } else {
          setLists(res.data);
        }
      });
  }
  const [venueList, setVenueList] = useState([]);
  const [dvenueId, setDVenueId] = useState(1);



  function venueListData() {
    sysService.venueList({})
      .then((res) => {
        if (res.total === 0) {
          setVenueList([]);
        } else {
          setVenueList(res.data);
          setDVenueId(res.data[0].id)
        }
      });
  }
console.log(venueList)

  const [venueId, setVenueId] = useState(dvenueId)
  const thisWeek = {
    'startTime': dayjs().startOf('week').format('YYYY-MM-DD'),
    'endTime': dayjs().endOf('week').format('YYYY-MM-DD'),
    'venueId':venueId,
  };
  useEffect(() => {
    venueListData();
    scheduleDateList(thisWeek);
  }, []);

  function onSelect(dateString, date) {
    console.log(null)
  }

  function onChange(dateString, date) {
    let w = [];
    for (let day = 0; day < 7; day++) {
      w.push({
        'week': week[day],
        'day': date.startOf('week').add(+day, 'day').format('YYYY-MM-DD'),
      });
    }
    setWeeks(w);

    let dates = {
      'startTime': date.startOf('week').format('YYYY-MM-DD'),
      'endTime': date.endOf('week').format('YYYY-MM-DD'),
      'venueId':venueId,
    };
    scheduleDateList(dates);
  }


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


  const Option = Select.Option;

  const Reload = (r) => {
    if(r){
      scheduleDateList(thisWeek);
    }
  }
  return (
    <div style={{ width: '100%' }}>
      <Card>
        <Divider orientation="left">

          <Select
            defaultValue={dvenueId}
            style={{ width: 200 }}
            placeholder="选择场馆"
            allowClear
            showSearch
            filterOption={(inputValue, option) =>
              option.props.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
            }
            removeIcon={<IconDelete />}
            renderFormat={(option, value) => {
              return option ? (
                <span>
              <IconLocation
                style={{
                  color: '#f7ba1e'
                }}
              />
                  {` ${option._key}  `}
            </span>
              ) : (
                value
              );
            }}
            onChange={(value, option) => {
              setVenueId(value);
              thisWeek['venueId'] = value;
              console.log(value)
              scheduleDateList(thisWeek);
            }}
          >
            {venueList && venueList.map((option) => (
              <Option key={option.name} value={option.id}>
                {option.name}
              </Option>
            ))}
          </Select>

          <Divider type="vertical" />
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
          <Button onClick={(e) => {
            scheduleDateList(thisWeek);
          }}>刷新列表</Button>
        </Divider>
        <Row style={{ marginBottom: 16, backgroundColor: 'var(--color-fill-2)' }}>

          {weeks.map((day, index) => (
            <Col flex="13.5%" key={index} style={{ marginLeft: 10, backgroundColor: 'var(--color-fill-2)' }}>
              <Card
                style={{ marginBottom: 10, marginTop: 10, textAlign: 'center' }}
                bodyStyle={{ paddingBottom: 0, paddingTop: 15 }}
              >
                <Typography.Text>{day.day}{day.week}</Typography.Text>
                <Card>
                  <Create date={day.day} Reload={Reload}/>
                </Card>
              </Card>
              {lists[day.day] && lists[day.day].map((value, index) => {
                return (
                  <Details props={value} />
                );
              })}

            </Col>
          ))}
        </Row>
      </Card>
    </div>
  )
    ;
}
<style>


</style>;