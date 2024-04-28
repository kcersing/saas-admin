import React, { useContext } from 'react';
import dayjs from 'dayjs';
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Grid,
} from '@arco-design/web-react';
import { GlobalContext } from '@/context';
import locale from './locale';
import useLocale from '@/utils/useLocale';
import { IconRefresh, IconSearch } from '@arco-design/web-react/icon';
import { ContentType, FilterType, Status } from './constants';
import styles from './style/index.module.less';

const { Row, Col } = Grid;
const { useForm } = Form;
function SearchForm(props: {
  onSearch: (values: Record<string, any>) => void;
}) {
  return (
    <>
aaaaaaaaaaaaaaa
    </>
  );
}
export default SearchForm;
