import { useState, useRef, useCallback } from 'react';
import { Select, Spin, Avatar, Form } from '@arco-design/web-react';
import debounce from 'lodash/debounce';
import  MemberService from '@/api/member';
function SearchByMember({Members}) {
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
          value:inputValue,
          option:"2",
        };

        MemberService.memberSearch(params)
        .then((res) => {
          if (res.data !== null){
          if (refFetchId.current === fetchId) {
            const options = [{
              label: (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar size={24} style={{ marginLeft: 6, marginRight: 12 }}>
                    <img alt='avatar' src={res.data.avatar} />
                  </Avatar>
                  {`${res.data.name}`}
                </div>
              ),
              value: res.data.id,
              key: res.data.id,
            }];
            setFetching(false);
            setOptions(options);
          }
        } else {
            const options = [{ label: '未查询到该会员', value: 0, key: 0, disabled:true}];
            setFetching(false);
            setOptions(options);
          }}
        )
        .catch((err) => {
          console.log(err);
         if( err.code === 501){
           const options = [{ label: '未查询到该会员', value: 0, key: 0, disabled:true}];
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
      placeholder='输入手机号搜索会员,可以单个或多个会员'
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
      onChange={(value) => {
        Members(value)
      }}

    />
    </Form.Item>
  );
}

export default SearchByMember;