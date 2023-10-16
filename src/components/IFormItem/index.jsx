import { BClazz, BItem, BProvider, User, XUser } from '@/common/components';
import { isFunction } from '@/common/utils';
import XInput from '@/components/XInput';

import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
} from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import IStatus from '../IStatus';
export default (props) => {
  const {
    xtype,
    required,
    message,
    regexp,
    name,
    label,
    labelCol,
    options,
    type,
    loading,
    children,
    labelWrap,
    displayName,
    displayValue,
    tag,
    max,
    ruleType,
    format,
    tooltip,
    showTime,
    ...others
  } = props;

  const [ui, setUi] = useState(<></>);

  const renderComponent = () => {
    let ioptions = isFunction(options) ? options() : options;
    let beFormItem = true;
    let item;
    switch (xtype) {
      case 'id':
        item = (
          <Form.Item style={{ display: 'none' }}>
            <Form.Item name="id" label="id">
              <Input />
            </Form.Item>
          </Form.Item>
        );
        beFormItem = false;
        break;
      case 'hidden':
        item = (
          <Form.Item name={name} style={{ display: 'none' }}>
            item = <Input {...others} />;
          </Form.Item>
        );
        beFormItem = false;
        break;
      case 'input':
        item = <Input {...others} />;
        break;
      case 'password':
        item = <Input type='password' {...others} />;
        break;
      case 'xinput':
        item = <XInput {...others} />;
        break;
      case 'textarea':
        item = <Input.TextArea {...others} />;
        break;
      case 'date':
        item = (
          <DatePicker
            style={{ width: '100%' }}
            {...others}
            format={format ? format : 'YYYY-MM-DD'}
            onChange={() => { }}
          />
        );
        break;
      case 'datetime':
        item = (
          <DatePicker
            format={format ? format : 'YYYY-MM-DD HH:mm'}
            showTime={showTime || { defaultValue: moment('00:00', 'HH:mm') }}
            style={{ width: '100%' }}
            {...others}
          />
        );
        break;
      case 'number':
        item = (
          <InputNumber
            max={10000000}
            style={{ width: '100%' }}
            {...others}
          />
        );
        break;
      case 'select':
        item = (
          <Select style={{ width: '100%' }} options={ioptions} {...others}>
            {children}
          </Select>
        );
        break;
      case 'radio':
        item = (
          <Radio.Group {...others} options={ioptions}>
            {children}
          </Radio.Group>
        );
        break;
      case 'checkbox':
        item = (
          <Checkbox.Group options={ioptions} {...others}>
            {children}
          </Checkbox.Group>
        );
        break;
      case 'submit':
        beFormItem = false;
        item = <Button type={type || 'primary'} loading={loading} htmlType="submit" {...others} >{children}</Button>;
        break;
      case 'button':
        beFormItem = false;
        item = <Button type={type || 'default'} {...others} >{children}</Button>;
        break;
      case 'user':
        item = <User tag={tag} {...others} displayName={displayName} />;
        break;
      case 'xuser':
        item = <XUser tag={tag} {...others} />;
        break;
      case 'clazz':
        item = <BClazz {...others} displayName={displayName} />;
        break;
      case 'item':
        item = <BItem {...others} displayName={displayName} />;
        break;
      case 'provider':
        item = <BProvider  {...others} displayName={displayName} />;
        break;
      case 'switch':
        item = <Switch {...others} />;
        break;
      case 'state':
        item = <IStatus state={props.state} />
        break;
      case 'span':
        item = <span className="ant-form-text" {...others}>{children}</span>
        break;
      case 'empty':
        beFormItem = false;
        item = <></>;
        break;
    }

    const otherRule = {};
    if (max) {
      otherRule.max = max;
    }
    if (ruleType) {
      otherRule.type = ruleType;
    }
    if (regexp) {
      otherRule.regexp = regexp;
    }

    const formItem = beFormItem ? (
      <Form.Item
        name={name}
        label={label}
        labelCol={labelWrap ? { span: 24 } : labelCol || { flex: '80px' }}
        tooltip={tooltip || false}
        rules={[
          {
            required: required || false,
            message: message,
            ...otherRule,
            //type: ruleType || false,
            //regexp: regexp || false,
          },
        ]}
      >
        {item}
      </Form.Item>
    ) : (
      <>{item}</>
    );
    setUi(formItem);
  };

  useEffect(() => {
    renderComponent();
  }, [props]);

  return ui;
};
