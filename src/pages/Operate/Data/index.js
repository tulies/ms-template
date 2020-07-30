import React from "react";
import PageWrapper from "@/components/PageWrapper";
import { Layout } from "antd";

import PageHeader from "@/components/PageHeader";

import TreeSlider from "./TreeSlider";
import DataLeaf from "./DataLeaf";
import DataNode from "./DataNode";
import styles from "./index.module.less";
import { useState } from "react";

const { Sider, Content } = Layout;

// monaco-editor 如何使用 ：https://zhuanlan.zhihu.com/p/47746336
export default (props) => {
  const [leaf, setLeaf] = useState(true);
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
          {leaf ? <DataLeaf /> : <DataNode />}
        </Content>
      </Layout>
    </PageWrapper>
  );
};
