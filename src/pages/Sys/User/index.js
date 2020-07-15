import React from "react";
import {
  Table,
  Card,
  Button,
  Input,
  Select,
  Tooltip,
  Form,
  Pagination,
  Badge,
  message,
} from "antd";

import {
  DownSquareOutlined,
  PlusOutlined,
  SendOutlined,
  PoweroffOutlined,
  // DeleteOutlined,
  DeleteRowOutlined,
  // MoreOutlined,
} from "@ant-design/icons";
import { observer, inject } from "mobx-react";

import PageWrapper from "../../../components/PageWrapper";
import PageHeader from "../../../components/PageHeader";
import PageContent from "../../../components/PageWrapper/Content";
// 新增界面
import AddModal from "./AddModal";

const { Search } = Input;
const { Option } = Select;
const statusMap = ["default", "processing", "error"];
const status = ["新建", "启用中", "已停用"];

const columns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "UID",
    dataIndex: "uid",
  },
  {
    title: "称呼",
    dataIndex: "alias",
  },
  {
    title: "帐号",
    dataIndex: "username",
  },
  {
    title: "状态",
    dataIndex: "status",
    render(val) {
      return <Badge status={statusMap[val]} text={status[val]} />;
    },
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
  },
  {
    title: "更新时间",
    dataIndex: "updateTime",
  },
];
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User", // Column configuration not to be checked
    name: record.name,
  }),
};
@inject("store")
@observer
class User extends React.PureComponent {
  state = {
    tableLoading: true,
    addModalVisible: false,
    // detailDialogVisible: false,
    // multipleSelection: [],
    // currentRow: null,
    pageNum: 1,
    pageSize: 1,

    // // 查询过滤条件
    // sorter: {}, // 排序 sortfield: 'id', sorttype: 'asc'

    /** ***********搜索用到的一些属性 ************/
    // showMoreSearchCheckbox: false,
    showMoreSearch: false, // 是否显示/使用高级搜索
    // moreSearchCheckList: [...initMoreSearchCheckList],
    // moreSeachProps: { ...moreSeachProps },
    // tableColumnCheckedList: [...initTableColumnCheckedList],
    // tableHeaderProps: { ...tableHeaderProps },
    simpleSearchObj: {
      key: "id",
      value: null,
    },
    // 检索字段
    filters: {}, // 检索区域的输入框检索条件
    tableFilters: {}, // table页头的检索条件
  };
  // 查询列表数据
  queryListData() {
    const { store } = this.props;
    // const { pageNum, pageSize } = this.state;
    this.setState({ tableLoading: true });
    store.User.queryUserList({
      payload: this.getQueryParams(),
    }).then(() => {
      this.setState({ tableLoading: false });
    });
  }
  // 生成查询条件
  getQueryParams() {
    const { pageNum, pageSize } = this.state;
    return {
      pageNum,
      pageSize,
      ...this.getFiltersParams(),
      // ...this.getSorterParams(),
    };
  }
  // 获取检索条件字段
  getFiltersParams() {
    const { showMoreSearch, simpleSearchObj } = this.state;
    let searchOptions = {};

    // 如果是用普通搜索
    if (!showMoreSearch) {
      if (simpleSearchObj.key) {
        searchOptions[simpleSearchObj.key] = simpleSearchObj.value;
      }
    } else {
      searchOptions = {
        ...this.filters,
      };
    }
    searchOptions = {
      ...searchOptions,
      ...this.tableFilters,
    };

    console.log("searchOptions", searchOptions);
    const searchParams = {};
    const searchKeys = Object.keys(searchOptions).filter((key) => {
      // 这个条件是为了减少不必要的参数，一大堆查询参数看着难受。
      // 如果有特殊条件，比如就是要传空值，那么你就需要单独判断下。
      if (searchOptions[key] === null || searchOptions[key] === "") {
        return false;
      }
      return true;
    });
    searchKeys.forEach((key) => {
      searchParams[key] = searchOptions[key];
    });
    return searchParams;
  }

  // // 重置查询
  // handleReset() {
  //   // this.initdata()
  //   this.pagenum = 0;
  //   this.simpleSearchObj = { key: "", value: "" };
  //   this.filters = { ...defaultValues };
  //   this.moreSearchCheckList = [...initMoreSearchCheckList];
  //   // 表头的条件看自己需要，想加就加
  //   // this.$refs.listTable.clearFilter()
  //   console.log("handleReset", this.filters);
  //   this.queryListData();
  // }
  // 页面切换时触发
  handlePageChange(pageNum, pageSize) {
    console.log("handlePageChange", pageNum, pageSize);
    this.setState({ pageNum, pageSize });
    this.queryListData();
  }
  handleShowMoreSearch() {
    this.setState({
      showMoreSearch: true,
    });
  }
  componentDidMount() {
    this.queryListData();
  }
  handleShowAddModal() {
    this.setState({
      addModalVisible: true,
    });
  }

  render() {
    const { store } = this.props;
    // store.User.userList && console.log(store.User.userList.list);
    const {
      showMoreSearch,
      addModalVisible,
      tableLoading,
      pageNum,
      pageSize,
    } = this.state;

    const { list: tableData, total } = store.User.listData;
    return (
      <PageWrapper>
        <PageHeader {...this.props} title="平台用户管理"></PageHeader>
        <PageContent {...this.props}>
          <Card bordered={true}>
            <div className="tulies-table-constainer">
              <div className="tulies-table-operator">
                <div className="left-operator">
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      this.handleShowAddModal();
                    }}
                  >
                    新增
                  </Button>
                  <Button icon={<SendOutlined />}>发布</Button>
                  <Button icon={<PoweroffOutlined />}>撤回</Button>
                  <Button icon={<DeleteRowOutlined />}>删除</Button>
                </div>
                <div className="right-operator">
                  <div className="mr-10">
                    <Input.Group compact>
                      <Select defaultValue="Option1">
                        <Option value="Option1">标题</Option>
                        <Option value="Option2">ID</Option>
                      </Select>
                      <Search
                        placeholder="请输入搜索关键字"
                        onSearch={(value) => console.log(value)}
                        style={{ width: 180 }}
                      ></Search>
                    </Input.Group>
                  </div>
                  <Tooltip title="高级查询">
                    <Button
                      icon={<DownSquareOutlined />}
                      onClick={() => this.handleShowMoreSearch(true)}
                    >
                      高级查询
                    </Button>
                  </Tooltip>
                  {/* <Tooltip title="更多菜单">
                    <Button icon={<MoreOutlined />} />
                  </Tooltip> */}
                </div>
              </div>
              {!showMoreSearch ? null : (
                <div className="tulies-table-search-options">
                  <Form layout="inline">
                    <Form.Item label="Field A">
                      <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item label="Field B">
                      <Input placeholder="input placeholder" />
                    </Form.Item>
                  </Form>
                </div>
              )}
              <div className="tulies-table-list">
                <Table
                  rowSelection={{
                    // type: selectionType,
                    ...rowSelection,
                  }}
                  rowKey="id"
                  columns={columns}
                  dataSource={tableData}
                  pagination={false}
                  size="middle"
                  loading={tableLoading}
                />
              </div>
              <div className="tulies-table-bd">
                <div className="tulies-table-bd-left"></div>
                <div className="tulies-table-bd-right">
                  <Pagination
                    total={total}
                    showTotal={(total) => `共 ${total} 条`}
                    defaultPageSize={1}
                    defaultCurrent={20}
                    current={pageNum}
                    pageSize={pageSize}
                    showQuickJumper={true}
                    showSizeChanger={true}
                    onChange={(page, pageSize) => {
                      this.handlePageChange(page, pageSize);
                    }}
                  />
                </div>
              </div>
            </div>
          </Card>
        </PageContent>
        {addModalVisible ? (
          <AddModal
            visible={addModalVisible}
            handleCancel={() => {
              this.setState({ addModalVisible: false });
            }}
            handleOk={() => {
              const key = "addModalHandleOk";
              message.loading({ content: "正在处理中...", key });
              setTimeout(() => {
                this.setState({ addModalVisible: false });

                message.success({ content: "处理完成！", key, duration: 2 });
              }, 1000);
            }}
          ></AddModal>
        ) : null}
      </PageWrapper>
    );
  }
}
export default User;
