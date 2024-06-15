import { useState, useRef, useCallback } from 'react';
import { Select, Spin, Avatar, Form } from '@arco-design/web-react';
import debounce from 'lodash/debounce';
import sysService from '@/api/sys';

function SearchByName(props) {
  const [options, setOptions] = useState([]);
  const [fetching, setFetching] = useState(false);
  const refFetchId = useRef(null);
  const debouncedFetchUser = useCallback(
    debounce((inputValue) => {
      refFetchId.current = Date.now();
      const fetchId = refFetchId.current;
      setFetching(true);
      setOptions([]);
      sysService.memberList({
        mobile:inputValue,
        product:props.subscribe,
      })
        // .then((response) => response.json())
        .then((res) => {
          if (refFetchId.current === fetchId) {
            const options = res.data.map((user) => ({
              label: (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar size={24} style={{ marginLeft: 6, marginRight: 12 }}>
                    <img alt='avatar' src={user.avatar} />
                  </Avatar>
                  {`${user.name}`}
                </div>
              ),
              value: user.id,
              key: user.id,
            }));
            setFetching(false);
            setOptions(options);
          }


        })
        .catch((err) => {
          console.log(err);
        });
    }, 500),
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