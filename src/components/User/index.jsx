import {
  api,
  data2Option,
  isArray,
  isNil,
  split,
  stringRandom,
  useObservableAutoCallback,
  debounce,
} from '@/common/utils';
import { Select } from 'antd';
import { useEffect, useState, useRef } from 'react';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

const { Option } = Select;
// 用户组件
export default (props) => {

  const { value, displayName, placeholder, style, onGetUser, tag, onChange, ...others } = props;
  const [beTrigger, setBeTrigger] = useState(true);
  const [keyword, setKeyword] = useState();
  const [optionData, setOptionData] = useState([]);

  const delayedQuery = useRef(debounce((value) => loadData(value), 200)).current;

  useEffect(() => {
    if (value && displayName && beTrigger) {
      const labelInValue = { label: displayName, value: value };
      const option = [labelInValue];
      setOptionData(option);
      setKeyword(labelInValue);
    } else {
      // const v = (value && (value.indexOf('#') != -1 ? split(value, '#')[1] : value)) || undefined;
      let v = value || '';
      if (value) {
        if (value.indexOf('#') != -1) {
          v = split(value, '#')[1];
        }
      }
      if (!v) {
        fetchUser();
      } else {
        getUser(v);
      }

    }
  }, [displayName, value]);

  const getUser = (code) => {
    api.user.getByCode(code).subscribe({
      next: (data) => {
        const u = data2Option('userName', 'userRealCnName', data);
        setOptionData(u);
        setKeyword(u[0]);
      }
    })
  }

  const loadData = (keywords) => {
    api.user.listByKeyword(tag || '', keywords || '').subscribe({
      next:(data) => {
        setOptionData(data);
      }
    });
  }

  const fetchUser = (keywords) => {
    delayedQuery(keywords);
  };

  // const [onSearch, optionData, setOptionData] = useObservableAutoCallback((event) =>
  //   event.pipe(
  //     debounceTime(400),
  //     distinctUntilChanged(),
  //     switchMap((v) => api.user.listByKeyword(tag || '', v || '')),
  //   ),
  // );

  const [doOnChange] = useObservableAutoCallback((event) =>
    event.pipe(
      tap((v) => setBeTrigger(false)),
      tap((v) => setKeyword(v || {})),
      tap((v) => onChange && onChange(v?.value || '')),
      tap((v) => onGetUser && onGetUser(v || {})),
    ),
  );

  return (
    <Select
      showSearch
      labelInValue
      allowClear
      showArrow={false}
      value={keyword}
      placeholder={placeholder}
      filterOption={false}
      onSearch={fetchUser}
      onChange={doOnChange}
      style={style}
      {...others}
    >
      {optionData && isArray(optionData) && optionData.map((item) => <Option value={item.value} key={stringRandom(16) + item.value}>{item.label}</Option>)}
    </Select>
  );
};
