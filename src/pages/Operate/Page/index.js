import React, { useState, useEffect, useRef } from "react";
import PageWrapper from "@/components/PageWrapper";
import { Layout } from "antd";

import PageHeader from "@/components/PageHeader";

import TreeSlider from "./TreeSlider";

import styles from "./index.module.less";
import DataLeaf from "./DataLeaf";
import SelectTpl from "./views/SelectTpl";

const { Content } = Layout;

// monaco-editor 如何使用 ：https://zhuanlan.zhihu.com/p/47746336
export default (props) => {
  const [selectedNode, setSelectedNode] = useState(null);
  const treeRef = useRef();
  // const [rightClickNodeProps, setRightClickNodeProps] = useState(null);
  useEffect(() => {
    console.log("切换右侧页面");
    // return () => {
    //   alert("哈哈哈哈");
    // };
  }, [selectedNode]);

  // 渲染右键菜单
  const height = window.innerHeight - 100;
  return (
    <PageWrapper>
      <PageHeader
        {...props}
        // title="区块推荐数据维护"
        // hiddenBreadcrumb={true}
      ></PageHeader>
      <Layout style={{ height }} className={styles.playground}>
        <TreeSlider
          cRef={treeRef}
          onSelect={({ node }) => {
            console.log(node);
            if (selectedNode == null || selectedNode.id !== node.id) {
              setSelectedNode(node);
            }
          }}
          onSelectUpdate={({ node }) => {
            console.log(node);
            setSelectedNode(node);
          }}
        />
        <SelectTpl />
        <Content style={{ height: "100%" }}>
          {selectedNode ? <DataLeaf node={selectedNode} /> : "请选中页面区块"}
        </Content>
      </Layout>
    </PageWrapper>
  );
};
