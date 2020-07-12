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

import { queryUserList } from "@/services/UserService";
import PageWrapper from "../../../components/PageWrapper";
import PageHeader from "../../../components/PageHeader";
import PageContent from "../../../components/PageWrapper/Content";

const { Search } = Input;
const { Option } = Select;
const statusMap = ["default", "processing", "error"];
const status = ["新建", "启用中", "已停用"];

const columns = [
  {
    title: "ID",
    dataIndex: "id",

    // eslint-disable-next-line
    // render: (text) => <a>{text}</a>,
  },
  {
    title: "UID",
    dataIndex: "uid",
  },
  {
    title: "昵称",
    dataIndex: "nickname",
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
class PlatUser extends React.PureComponent {
  state = {
    // detailDialogVisible: false,
    // createDialogVisible: false,
    // multipleSelection: [],
    // currentRow: null,
    // pageNum: 1,
    // pageSize: 10,

    // // 查询过滤条件
    // sorter: {}, // 排序 sortfield: 'id', sorttype: 'asc'

    /** ***********搜索用到的一些属性 ************/
    // showMoreSearchCheckbox: false,
    showMoreSearch: false,
    // moreSearchCheckList: [...initMoreSearchCheckList],
    // moreSeachProps: { ...moreSeachProps },
    // tableColumnCheckedList: [...initTableColumnCheckedList],
    // tableHeaderProps: { ...tableHeaderProps },
    // simpleSearchObj: {
    //   key: "",
    //   value: "",
    // },
    // // 检索字段
    // // filters: { ...defaultValues },
    // tableFilters: {},
  };
  handleShowMoreSearch() {
    this.setState({
      showMoreSearch: true,
    });
  }
  componentDidMount() {
    const { store } = this.props;
    store.PlatUser.queryUserList();
  }
  render() {
    console.log("render--------------------------");
    const { store } = this.props;
    console.log(store);

    console.log(store);
    store.PlatUser.userList && console.log(store.PlatUser.userList.list);
    const { showMoreSearch } = this.state;
    console.log(
      "queryUserList",
      queryUserList().then((res) => console.log(res))
    );

    const data = store.PlatUser.userList ? store.PlatUser.userList.list : [];
    return (
      <PageWrapper>
        <PageHeader {...this.props} title="哈哈哈哈哈哈"></PageHeader>
        <PageContent {...this.props}>
          <Card bordered={true}>
            <div className="tulies-table-constainer">
              <div className="tulies-table-operator">
                <div className="left-operator">
                  <Button type="primary" icon={<PlusOutlined />}>
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
                  dataSource={data}
                  pagination={false}
                  size="middle"
                />
              </div>
              <div className="tulies-table-bd">
                <div className="tulies-table-bd-left"></div>
                <div className="tulies-table-bd-right">
                  <Pagination
                    total={85}
                    showTotal={(total) => `共 ${total} 条`}
                    defaultPageSize={20}
                    defaultCurrent={1}
                  />
                </div>
              </div>
            </div>
          </Card>
        </PageContent>
      </PageWrapper>
    );
  }
}
export default PlatUser;
