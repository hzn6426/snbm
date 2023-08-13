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
import { useRef, useState } from 'react';

//列初始化
const initColumns = [
    {
        title: '订单编码',
        width: 110,
        dataIndex: 'code',
    },
    {
        title: '商品名称',
        width: 100,
        dataIndex: 'itemName',
    },
    {
        title: '数量',
        width: 100,
        dataIndex: 'quantity',
    },
    {
        title: '单价',
        width: 100,
        dataIndex: 'price',
    },
    {
        title: '总价',
        width: 100,
        dataIndex: 'money',
    },
    {
        title: '客服',
        width: 100,
        dataIndex: 'service',
    },
    {
        title: '销售',
        width: 100,
        dataIndex: 'seller',
    },
    {
        title: '下单时间',
        width: 150,
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
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [selectedKeys, setSelectedKeys] = useState([]);

    const ref = useRef();

    const refresh = () => ref.current.refresh();

    const onChange = (record) => {
        setSelectedKeys(pluck('id', record));
    }


    const onDelete = () => {
        api.order.deleteOrder(selectedKeys).subscribe({
            next: () => {
                message.success('操作成功!');
                search(pageNo,pageSize);
            }
        });
    }

    const onDoubleClick = (id) => {
        INewWindow({
            url: '/new/order/' + id,
            title: '编辑提单',
            width: 700,
            height: 600,
            callback: () => refresh()
        });
    }

    const onNewClick = () => {
        INewWindow({
            url: '/new/order/ADD',
            title: '新建提单',
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
        api.order.searchOrder(param).subscribe({
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
                    label="提单编码"
                    xtype="input"
                />
                <IFormItem
                    name="name"
                    label="商品名称"
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
                pageNo={pageNo}
                pageSize={pageSize}
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
                    onClick={() => showDeleteConfirm('确定删除选中的提单吗?', () => onDelete(selectedKeys))}
                >
                    删除
                </Button>

            </IFooterToolbar>
        </>
    );
};
