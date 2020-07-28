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
  Space,
  Dropdown,
  Menu,
  message,
  Modal,
} from "antd";

import {
  // DownSquareOutlined,
  // UpSquareOutlined,
  PlusOutlined,
  SendOutlined,
  PoweroffOutlined,
  FormOutlined,
  DeleteRowOutlined,
  DeleteOutlined,
  // BarsOutlined,
  // SettingOutlined,
  SettingFilled,
  // EllipsisOutlined,
  ExclamationCircleOutlined,
  DownCircleOutlined,
  CloseOutlined,
  SearchOutlined,
  FileSearchOutlined,
  DoubleRightOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { observer, inject } from "mobx-react";

import PageWrapper from "../../../components/PageWrapper";
import PageHeader from "../../../components/PageHeader";
import PageContent from "../../../components/PageWrapper/Content";
// 新增界面
import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";

const { Search } = Input;
const { Option } = Select;
const statusMap = ["default", "processing", "error"];
const status = ["新建", "启用中", "已停用"];
const getValue = (obj) =>
  Object.keys(obj)
    .map((key) => obj[key])
    .join(",");
@inject("store")
@observer
class User extends React.PureComponent {
  state = {
    tableLoading: true,
    addModalVisible: false,
    updateModalVisible: false,
    // multipleSelection: [],
    currentRow: null,
    pageNum: 1,
    pageSize: 10,
    selectedRowKeys: "",
    selectedRows: [],

    // // 查询过滤条件
    sorter: {}, // 排序 sortfield: 'id', sorttype: 'asc'

    /** ***********搜索用到的一些属性 ************/
    // showMoreSearchCheckbox: false,
    showMoreSearch: false, // 是否显示/使用高级搜索
    displaySearchForm: true, // 样式控制显示或者隐藏
    // moreSearchCheckList: [...initMoreSearchCheckList],
    // moreSeachProps: { ...moreSeachProps },
    // tableColumnCheckedList: [...initTableColumnCheckedList],
    // tableHeaderProps: { ...tableHeaderProps },
    simpleSearchObj: {
      key: "title",
      value: "",
    },
    // 检索字段
    moreFilters: {}, // 高级检索区域的输入框检索条件
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
      ...this.getSorterParams(),
    };
  }
  // 获取检索条件字段
  getFiltersParams() {
    const {
      showMoreSearch,
      simpleSearchObj,
      moreFilters,
      tableFilters,
    } = this.state;
    let searchOptions = {};

    // 如果是用普通搜索
    if (!showMoreSearch) {
      if (simpleSearchObj.key) {
        searchOptions[simpleSearchObj.key] = simpleSearchObj.value;
      }
    } else {
      searchOptions = {
        ...moreFilters,
      };
    }
    searchOptions = {
      ...searchOptions,
      ...tableFilters,
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

  // 获取排序参数
  getSorterParams() {
    const { sorter } = this.state;
    if (sorter && sorter.sortfield && sorter.sorttype) {
      const { sortfield, sorttype } = sorter;
      return {
        sorter: `${sortfield} ${sorttype}`,
      };
    }
    return {};
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
    this.setState({ pageNum, pageSize }, () => {
      this.queryListData();
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
  handleShowUpdateModal(record) {
    console.log("record", record);
    this.setState({
      currentRow: record,
      updateModalVisible: true,
    });
  }

  // 删除记录 接受一个ids数组
  handleDelete(records) {
    const { store } = this.props;
    const onlineRecords = records.filter((v) => v.status === 1);
    if (onlineRecords.length > 0) {
      message.error("正在启用的记录无法直接删除！");
      return;
    }
    const ids = records.map((v) => v.id);

    Modal.confirm({
      title: "您确认删除这些记录吗？",
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        message.loading({ content: "正在处理中...", key: "handleDelete" });

        store.User.deleteUser({ payload: { ids } }).then((res) => {
          const { count } = res;
          message.success({
            content: `成功删除${count}条数据!`,
            key: "handleDelete",
          });
          const { list, total } = store.User.listData;
          const { pageNum, pageSize } = this.state;

          const precount = list.length;
          // 判断一下count 是否与当前页面的记录条数相等，要是相等，就要查询前一页数据。
          if (count === precount && pageNum * pageSize >= total) {
            this.setState({ pageNum: pageNum - 1 }, () => {
              this.queryListData();
            });
            return;
          }
          this.queryListData();
        });
      },
      // onCancel() {
      //   console.log("Cancel");
      // },
    });
  }
  handleOffline(records) {
    const { store } = this.props;
    const status = 2;
    message.loading({ content: "正在处理中...", key: "handleOffline" });

    const ids = records.map((v) => v.id);
    store.User.changeStatus({ payload: { ids, status } }).then((res) => {
      const { count } = res;
      message.success({
        content: `成功处理${count}条数据!`,
        key: "handleOffline",
      });
      // todo 暂时我先偷懒直接刷新页面吧，以后优化
      this.queryListData();
    });
  }
  handleOnline(records) {
    const { store } = this.props;
    const status = 1;
    message.loading({ content: "正在处理中...", key: "handleOnline" });

    const ids = records.map((v) => v.id);
    store.User.changeStatus({ payload: { ids, status } }).then((res) => {
      const { count } = res;
      message.success({
        content: `成功处理${count}条数据!`,
        key: "handleOnline",
      });
      // todo 暂时我先偷懒直接刷新页面吧，以后优化
      this.queryListData();
    });
  }
  // 指令操作
  handleCommand(command, record) {
    console.log("handleCommand", command, record);
    // const { id } = record;
    // this.currentRow = row;
    if (command === "delete") {
      // 删除
      this.handleDelete([record]);
    } else if (command === "online") {
      // 上线
      this.handleOnline([record]);
    } else if (command === "offline") {
      // 下线
      this.handleOffline([record]);
    }
  }
  // 批量操作
  handleCommandBatch(command) {
    const { selectedRows } = this.state;
    console.log(selectedRows);
    if (selectedRows.length < 1) {
      message.error("请先选择你要操作的数据！");
      return;
    }
    // const ids = selectedRows.map((v) => v.id);
    if (command === "delete") {
      // 删除
      this.handleDelete(selectedRows);
    } else if (command === "online") {
      // 上线
      this.handleOnline(selectedRows);
    } else if (command === "offline") {
      // 下线
      this.handleOffline(selectedRows);
    }
  }
  // 新增
  addModalHandleOk() {}
  render() {
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        // console.log(
        //   `selectedRowKeys: ${selectedRowKeys}`,
        //   "selectedRows: ",
        //   selectedRows
        // );
        this.setState({
          selectedRowKeys,
          selectedRows,
        });
      },
      getCheckboxProps: (record) => ({
        // admin用户不允许删除
        // disabled: record.username === "admin", // Column configuration not to be checked
        // name: record.name,
      }),
    };
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
        filters: [
          {
            text: "新建",
            value: 0,
          },
          {
            text: "启用",
            value: 1,
          },
          {
            text: "停用",
            value: 2,
          },
        ],
      },
      {
        title: "状态",
        dataIndex: "status",
        filters: [
          {
            text: "新建",
            value: 0,
          },
          {
            text: "启用",
            value: 1,
          },
          {
            text: "停用",
            value: 2,
          },
        ],
        render(val) {
          return <Badge status={statusMap[val]} text={status[val]} />;
        },
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        sorter: true,
      },
      {
        title: "更新时间",
        dataIndex: "updateTime",
      },
      {
        title: ({ sortOrder, sortColumn, filters }) => {
          return (
            <span>
              操作
              <Tooltip title="列设置">
                <Button type="link" icon={<SettingFilled />} />
              </Tooltip>
            </span>
          );
        },
        key: "action",
        render: (text, record) => (
          <Space size={0}>
            {/* <SettingOutlined /> */}
            <Tooltip title="详情编辑">
              <Button
                type="link"
                icon={<FormOutlined />}
                onClick={() => {
                  this.handleShowUpdateModal(record);
                }}
              />
            </Tooltip>
            <Tooltip title="删除">
              <Button
                type="link"
                icon={<DeleteOutlined />}
                onClick={() => {
                  this.handleCommand("delete", record);
                }}
              />
            </Tooltip>

            <Dropdown
              overlay={() => {
                return actionMenu(record);
              }}
              placement="bottomCenter"
              arrow
            >
              <Button type="link" icon={<DownCircleOutlined />} />
            </Dropdown>
          </Space>
        ),
      },
    ];

    const actionMenu = (record) => (
      <Menu
        onClick={({ key }) => {
          this.handleCommand(key, record);
        }}
      >
        <Menu.Item key="online">启用</Menu.Item>
        <Menu.Item key="offline">停用</Menu.Item>
        <Menu.Item key="delete">删除</Menu.Item>
      </Menu>
    );

    const { store } = this.props;
    // store.User.userList && console.log(store.User.userList.list);
    const {
      showMoreSearch,
      addModalVisible,
      updateModalVisible,
      tableLoading,
      pageNum,
      pageSize,
      currentRow,
      simpleSearchObj,
      displaySearchForm,
      moreFilters,
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
                  <Button
                    icon={<SendOutlined />}
                    onClick={() => {
                      this.handleCommandBatch("online");
                    }}
                  >
                    启用
                  </Button>
                  <Button
                    icon={<PoweroffOutlined />}
                    onClick={() => {
                      this.handleCommandBatch("offline");
                    }}
                  >
                    停用
                  </Button>
                  <Button
                    icon={<DeleteRowOutlined />}
                    onClick={() => {
                      this.handleCommandBatch("delete");
                    }}
                  >
                    删除
                  </Button>
                </div>
                {showMoreSearch ? (
                  <div className="right-operator">
                    <Button
                      type="primary"
                      ghost
                      icon={<SearchOutlined />}
                      onClick={() => {
                        this.queryListData();
                      }}
                    >
                      点击查询
                    </Button>
                    <Tooltip title="收起条件">
                      <Button
                        icon={
                          <DoubleRightOutlined
                            rotate={displaySearchForm ? -90 : 90}
                          />
                        }
                        onClick={() => {
                          console.log(this.state.displaySearchForm);
                          this.setState({
                            displaySearchForm: !displaySearchForm,
                          });
                        }}
                      ></Button>
                    </Tooltip>
                    <Tooltip title="重置查询">
                      <Button
                        icon={<RedoOutlined />}
                        onClick={() => {}}
                      ></Button>
                    </Tooltip>
                    <Tooltip title="退出高级查询">
                      <Button
                        icon={<CloseOutlined />}
                        onClick={() => {
                          this.setState({
                            showMoreSearch: false,
                            displaySearchForm: true,
                          });
                        }}
                      ></Button>
                    </Tooltip>
                  </div>
                ) : (
                  <div className="right-operator">
                    <div className="mr-10">
                      <Input.Group compact>
                        <Select
                          defaultValue={simpleSearchObj.key}
                          onChange={(value, option) => {
                            console.log(value);
                            this.setState({
                              simpleSearchObj: { key: value },
                            });
                          }}
                        >
                          <Option value="title">标题</Option>
                          <Option value="id">ID</Option>
                        </Select>
                        <Search
                          placeholder="请输入搜索关键字"
                          // value={simpleSearchObj.value}
                          onSearch={(value) => {
                            console.log(value);
                            this.setState(
                              {
                                simpleSearchObj: {
                                  ...simpleSearchObj,
                                  value,
                                },
                              },
                              () => {
                                this.queryListData();
                              }
                            );
                          }}
                          style={{ width: 180 }}
                        ></Search>
                      </Input.Group>
                    </div>
                    <Button
                      icon={<FileSearchOutlined />}
                      onClick={() => {
                        this.setState({ showMoreSearch: true });
                      }}
                    >
                      高级查询
                    </Button>
                  </div>
                )}
                {/* <Tooltip title="更多菜单">
                    <Button icon={<MoreOutlined />} />
                  </Tooltip> */}
              </div>
              {!showMoreSearch ? null : (
                <div
                  className="tulies-table-search-options"
                  style={{ display: displaySearchForm ? "block" : "none" }}
                >
                  <Form
                    layout="inline"
                    onValuesChange={(values) => {
                      console.log(values);
                      this.setState({
                        moreFilters: { ...moreFilters, ...values },
                      });
                    }}
                  >
                    <Form.Item
                      label="ID"
                      initialValue={moreFilters.id}
                      name="id"
                    >
                      <Input placeholder="ID" />
                    </Form.Item>
                    <Form.Item
                      label="用户ID"
                      initialValue={moreFilters.uid}
                      name="uid"
                    >
                      <Input placeholder="用户ID" />
                    </Form.Item>
                    <Form.Item
                      label="用户昵称"
                      initialValue={moreFilters.alias}
                      name="alias"
                    >
                      <Input placeholder="称呼、昵称" />
                    </Form.Item>
                    <Form.Item
                      label="用户账号"
                      initialValue={moreFilters.username}
                      name="username"
                    >
                      <Input placeholder="用户账号" />
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
                  onChange={(pagination, filtersArg, sorter) => {
                    let state = {};
                    console.log(pagination, filtersArg, sorter);

                    const filters = Object.keys(filtersArg).reduce(
                      (obj, key) => {
                        const newObj = { ...obj };
                        newObj[key] = getValue(filtersArg[key]);
                        return newObj;
                      },
                      {}
                    );
                    console.log(filters);

                    if (sorter.field) {
                      state = {
                        ...state,
                        sorter: {
                          sortfield: sorter.field,
                          sorttype: sorter.order,
                        },
                      };
                    }
                    this.setState({ ...state }, () => {
                      this.queryListData();
                    });
                  }}
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
              this.setState({ addModalVisible: false });
              // 重新刷新下列表
              this.queryListData();
            }}
          ></AddModal>
        ) : null}

        {updateModalVisible && currentRow ? (
          <UpdateModal
            visible={updateModalVisible}
            row={currentRow}
            handleCancel={() => {
              this.setState({ updateModalVisible: false });
            }}
            handleOk={() => {
              this.setState({ updateModalVisible: false });
              // 重新刷新下列表
              this.queryListData();
            }}
          ></UpdateModal>
        ) : null}
      </PageWrapper>
    );
  }
}
export default User;
