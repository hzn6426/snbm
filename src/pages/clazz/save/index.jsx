import { IFormItem, ILayout, IWindow } from '@/common/components';
import { api, useAutoObservable, useAutoObservableEvent } from '@/common/utils';
import { message } from 'antd';
import { useState } from 'react';
import { filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { useParams } from 'umi';


export default (props) => {
    const params = useParams();
    const { clientWidth, clientHeight } = window?.document?.documentElement;
    const [loading, setLoading] = useState(false);

    const [current, setCurrent] = useAutoObservable((inputs$) =>
        inputs$.pipe(
            map(([id]) => id),
            filter(id => id !== 'ADD'),
            switchMap((id) => api.clazz.getClass(id)),
            map((clazz) => {
                return clazz[0];
            })
        ),
        [params.id],
    )

    const [onSaveClick] = useAutoObservableEvent([
        tap(() => setLoading(true)),
        switchMap((clazz) => api.clazz.saveOrUpdateClass(clazz)),
        tap(() => {
            message.success('操作成功!');
            window.close();
            window.opener.onSuccess();
        }),
        shareReplay(1),
    ], () => setLoading(false));

    return (
        <IWindow
            current={current}
            className="snam-modal"
            title={(current && current.id) ? '编辑分类' : '新建分类'}
            width={clientWidth}
            height={clientHeight}
            onSubmit={(params) => onSaveClick(params)}
            onCancel={() => {
                window.close();
                window.opener.onSuccess();
            }}
        >
            <IFormItem xtype="id" />
            <ILayout type="vbox">
                <IFormItem
                    name="classCode"
                    label="分类编码"
                    xtype="input"
                    required={true}
                    max={30}
                />
                <IFormItem
                    name="className"
                    label="分类名称"
                    xtype="input"
                    required={true}
                    max={50}
                />
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