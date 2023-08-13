import { showDeleteConfirm } from '@/common/antd';
import {
    IFooterToolbar,
    IGrid
} from '@/common/components';
import {
    INewWindow,
    api,
    dateFormat,
    isEmpty,
    pluck,
} from '@/common/utils';
import {
    PlusOutlined
} from '@ant-design/icons';
import { Button, Form, message } from 'antd';
import { useRef, useState } from 'react';

//列初始化
const initColumns = [
    {
        title: '分类编码',
        width: 80,
        dataIndex: 'classCode',
    },
    {
        title: '分类名称',
        width: 100,
        dataIndex: 'className',
    },
    {
        title: '创建时间',
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
    const ref = useRef();
    const [searchForm] = Form.useForm();
    // const [selectedKeys, setSelectedKeys] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [total, setTotal] = useState(0);

    const [selectedKeys, setSelectedKeys] = useState([]);

    const refresh = () => ref.current.refresh();

    const onChange = (record) => {
        setSelectedKeys(pluck('id', record));
    }


    const onDelete = () => {
        api.clazz.deleteClass(selectedKeys).subscribe({
            next: () => message.success('操作成功!')
        });
    }

    const onDoubleClick = (id) => {
        INewWindow({
            url: '/new/clazz/' + id,
            title: '编辑分类',
            width: 600,
            height: 300,
            callback: () => refresh()
        });
    }

    const onNewClick = () => {
        INewWindow({
            url: '/new/clazz/ADD',
            title: '新建分类',
            width: 600,
            height: 300,
            callback: () => refresh()
        });
    }


    //查询
    const search = (pageNo, pageSize) => {
        setSelectedKeys([]);
        setSearchLoading(true);
        let param = { dto: {}, pageNo: pageNo, pageSize: pageSize };
        api.clazz.searchClass(param).subscribe({
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

            <IGrid
                ref={ref}
                title="分类列表"
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
                    onClick={() => showDeleteConfirm('确定删除选中的分类吗?', () => onDelete(selectedKeys))}
                >
                    删除
                </Button>

            </IFooterToolbar>
        </>
    );
};
