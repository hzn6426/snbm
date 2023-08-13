import { showDeleteConfirm } from '@/common/antd';
import {
  IFooterToolbar,
  IGrid
} from '@/common/components';
import {
  INewWindow,
  api,
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
    title: '编码',
    width: 80,
    dataIndex: 'code',
  },
  {
    title: '名称',
    width: 140,
    dataIndex: 'name',
  },
  {
    title: '简称',
    width: 100,
    dataIndex: 'simpleName',
  },
  {
    title: '联系人',
    width: 100,
    dataIndex: 'linkMan',
  },
  {
    title: '联系电话',
    width: 140,
    dataIndex: 'linkPhone',
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
    api.provider.deleteProvider(selectedKeys).subscribe({
      next: () => message.success('操作成功!')
    });
  }

  const onDoubleClick = (id) => {
    INewWindow({
      url: '/new/provider/' + id,
      title: '编辑供应商',
      width: 700,
      height: 600,
      callback: () => refresh()
    });
  }

  const onNewClick = () => {
    INewWindow({
      url: '/new/provider/ADD',
      title: '新建供应商',
      width: 700,
      height: 600,
      callback: () => refresh()
    });
  }


  //查询
  const search = (pageNo, pageSize) => {
    setSelectedKeys([]);
    setSearchLoading(true);
    let param = { dto: {}, pageNo: pageNo, pageSize: pageSize };
    api.provider.searchProvider(param).subscribe({
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
        title="供应商列表"
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
          onClick={() => showDeleteConfirm('确定删除选中的供应商吗?', () => onDelete(selectedKeys))}
        >
          删除
        </Button>

      </IFooterToolbar>
    </>
  );
};
