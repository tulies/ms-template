import React from "react";
import PageWrapper from "@/components/PageWrapper";
import { Tabs, Layout } from "antd";

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
import PageHeader from "@/components/PageHeader";

import TreeSlider from "./TreeSlider";
import DataEdit from "./DataEdit";
import DataPreview from "./DataPreview";
import DataSchema from "./DataSchema";
import styles from "./index.module.less";

const { TabPane } = Tabs;
const { Sider, Content } = Layout;

// monaco-editor 如何使用 ：https://zhuanlan.zhihu.com/p/47746336
export default (props) => {
  return (
    <PageWrapper>
      <PageHeader
        {...props}
        // title="区块推荐数据维护"
        // hiddenBreadcrumb={true}
      ></PageHeader>
      <Layout className={styles.playground}>
        <Sider className={styles.treeSlider}>
          <TreeSlider />
        </Sider>
        <Content style={{ height: "100%" }}>
          <Tabs
            defaultActiveKey="1"
            type="card"
            size="small"
            style={{ height: "100%" }}
          >
            <TabPane
              tab={
                <span>
                  <FormOutlined />
                  数据编辑
                </span>
              }
              key="1"
              style={{ height: "100%" }}
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
        </Content>
      </Layout>
    </PageWrapper>
  );
};
