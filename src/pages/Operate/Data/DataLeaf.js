import React from "react";
import { Tabs, Card, PageHeader, Button, Descriptions } from "antd";
import {
  // FolderOutlined,
  // FolderOpenOutlined,
  // DownOutlined,
  // ProfileOutlined,
  FormOutlined,
  CodeOutlined,
  // EyeOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import DataEdit from "./DataEdit";
import DataPreview from "./DataPreview";
import DataSchema from "./DataSchema";
const { TabPane } = Tabs;
export default () => {
  return (
    <div style={{ padding: "15px" }}>
      <PageHeader
        ghost={false}
        // onBack={() => window.history.back()}
        title="Title"
        subTitle="This is a subtitle"
        extra={[
          <Button key="3">Operation</Button>,
          <Button key="2">Operation</Button>,
          <Button key="1" type="primary">
            Primary
          </Button>,
        ]}
      >
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="Created">Lili Qu</Descriptions.Item>
          <Descriptions.Item label="Association">
            <a>421421</a>
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
      <Card bordered={true}>
        <Tabs
          defaultActiveKey="1"
          type="card"
          size="small"
          style={{ height: "80vh" }}
        >
          <TabPane
            tab={
              <span>
                <FormOutlined />
                数据编辑
              </span>
            }
            key="1"
          >
            <DataEdit />
          </TabPane>
          <TabPane
            tab={
              <span>
                <PlayCircleOutlined />
                数据预览
              </span>
            }
            key="3"
          >
            <DataPreview />
          </TabPane>
          <TabPane
            tab={
              <span>
                <CodeOutlined />
                数据模板
              </span>
            }
            key="2"
          >
            <DataSchema />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};
