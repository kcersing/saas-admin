import { useState, useRef, useCallback } from 'react';
import { Select, Spin, Avatar, Form } from '@arco-design/web-react';
import debounce from 'lodash/debounce';
import  ScheduleService from '@/api/schedule';

function SearchByName(props) {
  const [options, setOptions] = useState([]);
  const [fetching, setFetching] = useState(false);
  const refFetchId = useRef(null);
  const debouncedFetchUser = useCallback(
    debounce((inputValue) => {
        setOptions([])
      if(inputValue.length === 11 ){
      refFetchId.current = Date.now();
      const fetchId = refFetchId.current;
      setFetching(true);
      setOptions([]);
        const params = {
          mobile:inputValue,
          propertyId:props.schedule.property_id,
          venue:props.schedule.venue_id,
        };
        console.log(params)
        ScheduleService.searchSubscribeByName(params)
        // .then((response) => response.json())
        .then((res) => {
          if (res.data !== null){
          if (refFetchId.current === fetchId) {
            const options = res.data.map((user) => ({
              label: (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar size={24} style={{ marginLeft: 6, marginRight: 12 }}>
                    <img alt='avatar' src={user.avatar} />
                  </Avatar>
                  {`${user.member_name}-${user.member_product_name}-${user.member_product_property_name}`}
                </div>
              ),
              value: user.member_product_property_id,
              key: user.member_product_property_id,
            }));
            setFetching(false);
            setOptions(options);
          }
        } else {
            const options = [{ label: '该会员不符合约课条件', value: 0, key: 0, disabled:true}];
            setFetching(false);
            setOptions(options);
          }}
        )
        .catch((err) => {
          console.log(err);
         if( err.code === 501){
           const options = [{ label: '未找到符合约课条件的会员', value: 0, key: 0, disabled:true}];
           setFetching(false);
           setOptions(options);
         }

        });
    }
}

    , 500),
    []
  );
  return (
    <Form.Item label="会员" field="memberS" rules={[{ required: false }]}>
    <Select
      style={{ width: 345 }}
      showSearch
      mode='multiple'
      options={options}
      placeholder='输入手机号搜索会员'
      filterOption={false}
      renderFormat={(option) => {
        return option.children.props.children[1];
      }}
      notFoundContent={
        fetching ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Spin style={{ margin: 12 }} />
          </div>
        ) : null
      }
      onSearch={debouncedFetchUser}
    />
    </Form.Item>
  );
}

export default SearchByName;