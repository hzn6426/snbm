import { IFormItem, ILayout, IWindow } from '@/common/components';
import { api, constant, useAutoObservable, useAutoObservableEvent } from '@/common/utils';
import { message } from 'antd';
import moment from 'moment/moment';
import { useRef, useState } from 'react';
import { filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { useParams } from 'umi';


export default (props) => {
    const params = useParams();
    const { clientWidth, clientHeight } = window?.document?.documentElement;
    const [loading, setLoading] = useState(false);
    const ref = useRef();
    const [current, setCurrent] = useAutoObservable((inputs$) =>
        inputs$.pipe(
            map(([id]) => id),
            filter(id => id !== 'ADD'),
            switchMap((id) => api.item.getItem(id)),
            map((item) => {
                const titem = item[0];
                titem.productTime = titem.productTime && moment(titem.productTime);
                titem.expireTime = titem.expireTime && moment(titem.expireTime);
                return titem;
            })
        ),
        [params.id],
    )

    const [onSaveClick] = useAutoObservableEvent([
        tap(() => setLoading(true)),
        switchMap((item) => api.item.saveOrUpdateItem(item)),
        tap(() => {
            message.success('操作成功!');
            window.close();
            window.opener.onSuccess();
        }),
        shareReplay(1),
    ], () => setLoading(false));

    return (
        <IWindow
            ref={ref}
            current={current}
            className="snam-modal"
            title={(current && current.id) ? '编辑商品' : '新建商品'}
            width={clientWidth}
            height={clientHeight}
            onSubmit={(params) => onSaveClick(params)}
            onCancel={() => {
                window.close();
                window.opener.onSuccess();
            }}
        >
            <IFormItem xtype="id" />
            <IFormItem xtype="hidden" name="providerName" />
            <IFormItem xtype="hidden" name="className" />
            <IFormItem xtype="hidden" name="keeper" />
            <ILayout type="hbox" spans="12 12">
                <IFormItem
                    name="code"
                    label="编码"
                    xtype="input"
                    required={false}
                    disabled={true}
                    tooltip="编码由系统自动生成"
                    max={30}
                />
                <IFormItem
                    name="name"
                    label="名称"
                    xtype="input"
                    required={true}
                    max={100}
                />
            </ILayout>
            <ILayout type="hbox" spans="12 12">
                <IFormItem
                    name="classId"
                    label="分类"
                    xtype="clazz"
                    required={true}
                    onGetClazz={(v) => {
                        ref.current.setFieldsValue({ className: v.label });
                    }}
                />
                <IFormItem
                    name="providerId"
                    label="供应商"
                    xtype="provider"
                    required={true}
                    onGetProvider={(v) => ref.current.setFieldsValue({ providerName: v.label })}
                />
            </ILayout>
            <ILayout type="hbox" spans="12 12">
                <IFormItem
                    name="quantity"
                    label="数量"
                    xtype="number"
                    required={true}
                    min={1}
                />
                <IFormItem
                    name="keeperCode"
                    label="库管"
                    xtype="user"
                    tag={constant.TAG_USER_KEEPER}
                    required={true}
                    onGetUser={(v) => ref.current.setFieldsValue({ keeper: v.label })}
                />
            </ILayout>
            <ILayout type="hbox" spans="12 12">
                <IFormItem
                    name="productTime"
                    label="生产时间"
                    xtype="datetime"
                    required={true}
                />
                <IFormItem
                    name="expireTime"
                    label="过期时间"
                    xtype="datetime"
                    required={true}
                />
            </ILayout>
            <ILayout type="vbox" >
                <IFormItem
                    name="note"
                    label="备注"
                    xtype="textarea"
                    rows={4}
                    max={100}
                />
            </ILayout>
        </IWindow>
    )
}