import {
    api,
    data2Option,
    isArray,
    stringRandom,
    debounce,
    useObservableAutoCallback
} from '@/common/utils';
import { Select } from 'antd';
import { useEffect, useState,useRef } from 'react';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

const { Option } = Select;
// 用户组件
export default (props) => {
    const { Option } = Select;

    const { value, displayName, placeholder, style, getUser, tag, onChange, onGetClazz, ...others } = props;
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
        } else if (value) {
            fetchClass(value);
        } else {
            onSearch('');
        }
    }, [displayName, value]);

    const fetchClass = (id) => {
        api.clazz.getClass(id).subscribe({
            next: (data) => {
                const u = data2Option('id', 'className', data);
                setOptionData(u);
                setKeyword(u[0]);
            }
        })
    }

    const loadData = (keywords) => {
        api.clazz.listByKeyword(keywords || '').subscribe({
          next:(data) => {
            setOptionData(data);
          }
        });
      }
    
      const onSearch = (keywords) => {
        delayedQuery(keywords);
      };

    // const [onSearch, optionData, setOptionData] = useObservableAutoCallback((event) =>
    //     event.pipe(
    //         debounceTime(400),
    //         distinctUntilChanged(),
    //         switchMap((v) => api.clazz.listByKeyword(v || '')),
    //     ),
    // );


    const doOnChange = (selectItem) => {
        setBeTrigger(false);
        setKeyword(selectItem || {});
        props.onChange(selectItem?.value || '');
        if (onGetClazz) {
            onGetClazz(selectItem || {})
        }
    };
    // const [doOnChange] = (selectItem) =>
    //     event.pipe(
    //         tap((v) => setBeTrigger(false)),
    //         tap((v) => setKeyword(v || {})),
    //         tap((v) => onChange && onChange(v?.value || '')),
    //         tap((v) => {
    //             alert(1111);
    //             console.log(v);
    //             if (onGetClazz) {
    //                 onGetClazz(v || {})
    //             }
    //         }),
    //     ),
    // );

    return (
        <Select
            showSearch
            labelInValue
            allowClear
            showArrow={false}
            value={keyword}
            placeholder={placeholder}
            filterOption={false}
            onSearch={onSearch}
            onChange={doOnChange}
            style={style}
            {...others}
        >
            {optionData && isArray(optionData) && optionData.map((item) => <Option value={item.value} key={stringRandom(16) + item.value}>{item.label}</Option>)}
        </Select>
    );
};
