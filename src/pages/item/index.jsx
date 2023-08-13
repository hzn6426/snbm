import { showDeleteConfirm } from '@/common/antd';
import {
    IFooterToolbar,
    IFormItem,
    IGrid,
    ISearchForm,
} from '@/common/components';
import {
    INewWindow,
    api,
    dateFormat,
    isEmpty,
    pluck
} from '@/common/utils';
import {
    PlusOutlined
} from '@ant-design/icons';
import { Button, Form, message } from 'antd';
import { useEffect, useRef, useState } from 'react';

//列初始化
const initColumns = [
    {
        title: '商品编码',
        width: 120,
        dataIndex: 'code',
    },
    {
        title: '商品名称',
        width: 100,
        dataIndex: 'name',
    },
    {
        title: '数量',
        width: 100,
        dataIndex: 'quantity',
    },
    {
        title: '分类',
        width: 100,
        dataIndex: 'className',
    },
    {
        title: '供应商',
        width: 100,
        dataIndex: 'providerName',
    },
    {
        title: '公司',
        width: 100,
        dataIndex: 'companyName',
    },
    {
        title: '库管',
        width: 100,
        dataIndex: 'keeper',
    },
    {
        title: '生产时间',
        width: 150,
        dataIndex: 'productTime',
        valueFormatter: (x) => dateFormat(x.value, 'yyyy-MM-dd hh:mm:ss'),
    },
    {
        title: '过期时间',
        width: 150,
        dataIndex: 'expireTime',
        valueFormatter: (x) => dateFormat(x.value, 'yyyy-MM-dd hh:mm:ss'),
    },
    {
        title: '创建时间',
        width: 250,
        dataIndex: 'createTime',
        valueFormatter: (x) => dateFormat(x.value, 'yyyy-MM-dd hh:mm:ss'),
    },
    {
        title: '备注',
        width: 100,
        dataIndex: 'note',
    }
];


export default (props) => {
    const [searchForm] = Form.useForm();
    const [dataSource, setDataSource] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [total, setTotal] = useState(0);
    
    const [selectedKeys, setSelectedKeys] = useState([]);

    const ref = useRef();

    const refresh = () => ref.current.refresh();

    const onChange = (record) => {
        setSelectedKeys(pluck('id', record));
    }


    const onDelete = () => {
        api.item.deleteItem(selectedKeys).subscribe({
            next: () => message.success('操作成功!')
        });
    }

    const onDoubleClick = (id) => {
        INewWindow({
            url: '/new/item/' + id,
            title: '编辑商品',
            width: 700,
            height: 600,
            callback: () => refresh()
        });
    }

    const onNewClick = () => {
        INewWindow({
            url: '/new/item/ADD',
            title: '新建商品',
            width: 700,
            height: 600,
            callback: () => refresh()
        });
    }


    //查询
    const search = (pageNo, pageSize) => {
        setSelectedKeys([]);
        setSearchLoading(true);
        let param = { dto: searchForm.getFieldValue(), pageNo: pageNo, pageSize: pageSize };
        api.item.searchItem(param).subscribe({
            next: (data) => {
                setDataSource(data.data);
                setTotal(data.total);
            },
        }).add(() => {
            setSearchLoading(false);
        });
    };

   


    // 列表及弹窗
    return (
        <>
            <ISearchForm
                form={searchForm}
                onReset={() => ref.current.refresh()}
                onSearch={() => ref.current.refresh()}
            >
                <IFormItem
                    name="code"
                    label="商品编码"
                    xtype="input"
                />
                <IFormItem
                    name="name"
                    label="商品名称"
                    xtype="input"
                />
                <IFormItem
                    name="classId"
                    label="分类"
                    xtype="input"
                />
                <IFormItem
                    name="providerId"
                    label="供应商"
                    xtype="input"
                />
            </ISearchForm>
            <IGrid
                ref={ref}
                title="商品列表"
                // columnsStorageKey="_cache_role_columns"
                initColumns={initColumns}
                request={(pageNo, pageSize) => search(pageNo, pageSize)}
                dataSource={dataSource}
                // pageNo={pageNo}
                // pageSize={pageSize}
                total={total}
                onSelectedChanged={onChange}
                onDoubleClick={(record) => onDoubleClick(record.id)}
                toolBarRender={[
                    <Button
                        key="add"
                        size="small"
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => onNewClick()}
                    >
                        新建
                    </Button>,

                ]}
                // onClick={(data) => onClicked(data)}
                clearSelect={searchLoading}
            />
            <IFooterToolbar visible={!isEmpty(selectedKeys)}>
                <Button
                    type="danger"
                    key="delete"
                    onClick={() => showDeleteConfirm('确定删除选中的商品吗?', () => onDelete(selectedKeys))}
                >
                    删除
                </Button>

            </IFooterToolbar>
        </>
    );
};
