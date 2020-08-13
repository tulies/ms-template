import React, { memo } from "react";
import {
  PageHeader,
  Descriptions,
  Table,
  Input,
  Select,
  Pagination,
  Button,
  Card,
  // Divider,
} from "antd";
import {
  PlusOutlined,
  SendOutlined,
  PoweroffOutlined,
  DeleteRowOutlined,
  FormOutlined,
  // FileSearchOutlined,
} from "@ant-design/icons";

const { Search } = Input;
const { Option } = Select;

export default memo((props) => {
  console.log("DataNode----render");
  const dataSource = [
    {
      key: "1",
      name: "首页索引",
      age: 32,
      address: "西湖区湖底公园1号",
    },
    {
      key: "2",
      name: "KV区块",
      age: 42,
      address: "西湖区湖底公园1号",
    },
    {
      key: "3",
      name: "电影",
      age: 42,
      address: "西湖区湖底公园1号",
    },
    {
      key: "4",
      name: "电视剧",
      age: 42,
      address: "西湖区湖底公园1号",
    },
    {
      key: "5",
      name: "综艺",
      age: 42,
      address: "西湖区湖底公园1号",
    },
  ];

  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "住址",
      dataIndex: "address",
      key: "address",
    },
  ];
  //   const rowSelection = {
  //     onChange: (selectedRowKeys, selectedRows) => {
  //       // console.log(
  //       //   `selectedRowKeys: ${selectedRowKeys}`,
  //       //   "selectedRows: ",
  //       //   selectedRows
  //       // );
  //       this.setState({
  //         selectedRowKeys,
  //         selectedRows,
  //       });
  //     },
  //     getCheckboxProps: (record) => ({
  //       // admin用户不允许删除
  //       disabled: record.username === "admin", // Column configuration not to be checked
  //       // name: record.name,
  //     }),
  //   };
  const simpleSearchObj = {
    key: "alias",
    value: "",
  };
  return (
    <div style={{ padding: "15px" }}>
      <PageHeader
        ghost={false}
        // onBack={() => window.history.back()}
        title="门户首页"
        subTitle="这是门户首页，2020-08-20年改版！"
        extra={[
          <Button key="2" icon={<FormOutlined />}>
            修改
          </Button>,
          // <Button key="1" icon={<PlusOutlined />} type="primary">
          //   子页面
          // </Button>,
        ]}
      >
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="Created">Lili Qu</Descriptions.Item>
          <Descriptions.Item label="Association">
            {/* <a>421421</a> */}
            421421
          </Descriptions.Item>
          <Descriptions.Item label="Creation Time">
            2017-01-10
          </Descriptions.Item>
          <Descriptions.Item label="Effective Time">
            2017-10-10
          </Descriptions.Item>
          <Descriptions.Item label="Remarks">
            Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
      {/* <Divider orientation="left" plain>
        Left Text
      </Divider> */}
      <Card bordered={true}>
        <div className="tulies-table-constainer">
          <div className="tulies-table-operator">
            <div className="left-operator">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  // this.handleShowAddModal();
                }}
              >
                数据碎片
              </Button>
              <Button
                icon={<SendOutlined />}
                onClick={() => {
                  // this.handleCommandBatch("online");
                }}
              >
                启用
              </Button>
              <Button
                icon={<PoweroffOutlined />}
                onClick={() => {
                  // this.handleCommandBatch("offline");
                }}
              >
                停用
              </Button>
              <Button
                icon={<DeleteRowOutlined />}
                onClick={() => {
                  // this.handleCommandBatch("delete");
                }}
              >
                删除
              </Button>
            </div>

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
                    <Option value="alias">标题</Option>
                    <Option value="id">ID</Option>
                  </Select>
                  <Search
                    placeholder="请输入搜索关键字"
                    // value={simpleSearchObj.value}
                    onSearch={(value) => {
                      // console.log(value);
                      // this.setState(
                      //   {
                      //     simpleSearchObj: {
                      //       ...simpleSearchObj,
                      //       value,
                      //     },
                      //   },
                      //   () => {
                      //     this.queryListData();
                      //   }
                      // );
                    }}
                    style={{ width: 180 }}
                  ></Search>
                </Input.Group>
              </div>
            </div>
          </div>
          <div className="tulies-table-list">
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={false}
            />
          </div>
          <div className="tulies-table-bd">
            <div className="tulies-table-bd-left"></div>
            <div className="tulies-table-bd-right">
              <Pagination
                total={10}
                showTotal={(total) => `共 ${10} 条`}
                defaultPageSize={1}
                defaultCurrent={20}
                current={1}
                pageSize={3}
                showQuickJumper={true}
                showSizeChanger={true}
                onChange={(page, pageSize) => {
                  // this.handlePageChange(page, pageSize);
                }}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
});
