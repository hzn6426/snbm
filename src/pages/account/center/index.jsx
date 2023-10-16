import React, { useState, useRef, useEffect } from 'react';
import { Typography, Card, Tabs, Form, Input, Button, Avatar, message, Row, Col, Upload, DatePicker } from 'antd';
import {
    api,
    constants,
} from '@/common/utils';
import {
    IFormItem, ILayout,
} from '@/common/components';
export default () => {
    const { TabPane } = Tabs;
    const { Title } = Typography;
    const [basicForm] = Form.useForm();
    const [authForm] = Form.useForm();
    const [emailForm] = Form.useForm();
    const [passwordForm] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const doUpdate = (values) => {
        setLoading(true);
        api.user.updateSelfUser(values).subscribe({
            next: (data) => {
                message.success("操作成功!");
            }
        }).add(() => {
            setLoading(false);
        });
    }

    const sendEmailValidation = () => {
        emailForm.validateFields().then(values => {
            setLoading(true);
            api.user.validateUserEmail(values).subscribe({
                next: (data) => {
                    message.success('验证邮件已发送,请检查发件邮箱,如5分钟内未收到激活成功的邮件,请联系管理员!');
                }
            }).add(() => setLoading(false));
        });
    }

    //获取当前用户信息
    const getCurrentUser = () => {
        api.user.getCurrentUser().subscribe({
            next: (data) => {
                const user = data[0];
                // setCurrentUser(user);
                user.authPassStart = user.authPassStart && moment(user.authPassStart);
                user.authPassEnd = user.authPassEnd && moment(user.authPassEnd);
                basicForm.setFieldsValue(user);
                emailForm.setFieldsValue(user);
                authForm.setFieldsValue(user);
                
            },
        });
    };
    
    useEffect(() => {
        getCurrentUser();
    }, []);

    return (
        <Card>
            <Tabs tabPosition="left">
                <TabPane tab="基本设置" key="1">
                    <Card
                        size='small'
                        bordered={true}
                        bodyStyle={{ height: 400, overflow: 'scroll' }}
                        title={<div>基本设置</div>}
                    >
                        <Form form={basicForm} size='small' className='snam-form' onFinish={doUpdate}>
                            <ILayout type="vbox">
                                <IFormItem xtype="input" disabled={true} label="账号" name="userName" />
                                <IFormItem xtype="input" disabled={true} label="姓名" name="userRealCnName" />
                                <IFormItem xtype="input" disabled={true} label="部门" name="groupName" />
                                <IFormItem xtype="input" disabled={true} label="职位" name="postName" />
                                <IFormItem xtype="input" disabled={false} label="手机" name="userMobile" required={true} message="请输入正确手机号" regexp="/^1[3456789]\d{9}$/" />
                                <IFormItem xtype="input" disabled={false} label="QQ" name="qq" required={true} message="请输入正确QQ号" regexp="/^[1-9][0-9]{4,9}$/" />
                                <IFormItem xtype="submit" style={{ float: 'right', marginRight:10 }} loading={loading}>更新信息</IFormItem>
                            </ILayout>
                        </Form>
                    </Card>
                </TabPane>
                <TabPane tab="安全设置" key="4">
                    <Card
                        size='small'
                        bordered={true}
                        bodyStyle={{ height: 400, overflow: 'scroll' }}
                        title={<div>安全设置</div>}
                    >
                        <Form form={passwordForm} size='small' className='snam-form' onFinish={doUpdate}>
                            <ILayout type="vbox">
                                <IFormItem xtype="password" disabled={false} label="原始密码" required={true} name="userPasswd" />
                                <IFormItem xtype="password" disabled={false} label="新密码" required={true} name="newPassword" />
                                <IFormItem xtype="input" disabled={false} label="确认密码" required={true} name="checkNewPassWord" />
                                <IFormItem xtype="submit" style={{ float: 'right', marginRight:10 }} loading={loading}>修改密码</IFormItem>
                            </ILayout>
                        </Form>
                    </Card>
                </TabPane>
                <TabPane tab="授权码设置" key="2">
                    <Card
                        size='small'
                        bordered={true}
                        bodyStyle={{ height: 400, overflow: 'scroll' }}
                        title={<div>授权码设置</div>}
                    >
                        <Form form={authForm} size='small' className='snam-form' onFinish={doUpdate}>
                            <ILayout type="vbox">
                                <IFormItem xtype="password" disabled={false} label="授权密码" required={true} name="authPass" />
                                <IFormItem xtype="datetime" disabled={false} label="授权有效期" name="authPassStart" />
                                <IFormItem xtype="datetime" disabled={false} label="至" name="authPassEnd" />
                                <IFormItem xtype="submit" style={{ float: 'right', marginRight:10 }} loading={loading}>更新信息</IFormItem>
                            </ILayout>
                        </Form>
                    </Card>
                </TabPane>
                <TabPane tab="邮箱设置" key="3">
                    <Card
                        size='small'
                        bordered={true}
                        bodyStyle={{ height: 400, overflow: 'scroll' }}
                        title={<div>邮箱设置</div>}
                    >
                        <Form form={emailForm} size='small' className='snam-form' onFinish={doUpdate}>
                            <ILayout type="vbox">
                                <IFormItem xtype="input" disabled={false} label="邮箱地址" ruleType="email" required={true} name="userEmail" />
                                <IFormItem xtype="password" disabled={false} label="授权码" required={true} name="userEmailPwd" />
                                <IFormItem xtype="input" disabled={false} label="授权协议" required={true} name="userEmailProtocol" />
                                <IFormItem xtype="input" disabled={false} label="服务器" required={true} name="userEmailHost" />
                                <IFormItem xtype="span" style={{float:'right',marginRight:0}}>
                                <Button size="small" style={{ float: 'right', marginRight:0 }} loading={loading} type='primary'>更新信息</Button>
                                <Button size="small" style={{ float: 'right', marginRight:5 }} loading={loading} type="danger" disabled={true} onClick={sendEmailValidation}>验证邮箱</Button>
                                </IFormItem>
                            </ILayout>
                        </Form>
                    </Card>
                </TabPane>

            </Tabs>
        </Card>
    );
}