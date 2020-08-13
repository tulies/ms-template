import React, { useState, useEffect } from "react";
import PageWrapper from "@/components/PageWrapper";
import { Layout, Menu } from "antd";

import PageHeader from "@/components/PageHeader";

import TreeSlider from "./TreeSlider";
// import DataLeaf from "./DataLeaf";
// import DataNode from "./DataNode";
import styles from "./index.module.less";
import DataLeaf from "./DataLeaf";
// import { useState } from "react";

const { Sider, Content } = Layout;
// const menu = (
//   <Menu>
//     <Menu.Item key="1">1st menu item</Menu.Item>
//     <Menu.Item key="2">2nd menu item</Menu.Item>
//     <Menu.Item key="3">3rd menu item</Menu.Item>
//   </Menu>
// );
// monaco-editor 如何使用 ：https://zhuanlan.zhihu.com/p/47746336
export default (props) => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [rightClickNodeTreeItem, setRightClickNodeTreeItem] = useState(null);
  useEffect(() => {
    console.log("切换右侧页面");
  }, [selectedNode]);

  const getNodeTreeRightClickMenu = (params) => {
    const { pageX, pageY, node } = params;
    const tmpStyle = {
      position: "absolute",
      left: `${pageX}px`,
      top: `${pageY}px`,
      zIndex: 1000,
    };
    const menu = (
      <div style={tmpStyle}>
        <Menu>
          <Menu.Item key="1">1st menu item</Menu.Item>
          <Menu.Item key="2">2nd menu item</Menu.Item>
          <Menu.Item key="3">3rd menu item</Menu.Item>
        </Menu>
      </div>
    );
    return menu;
  };

  return (
    <PageWrapper>
      <PageHeader
        {...props}
        // title="区块推荐数据维护"
        // hiddenBreadcrumb={true}
      ></PageHeader>
      <Layout className={styles.playground}>
        <Sider className={styles.treeSlider}>
          <TreeSlider
            onSelect={({ node }) => {
              console.log(node);
              if (selectedNode == null || selectedNode.id !== node.id) {
                setSelectedNode(node);
              }
            }}
            onRightClick={({ event, node }) => {
              setRightClickNodeTreeItem({
                pageX: event.pageX,
                pageY: event.pageY,
                node,
              });
            }}
          />
        </Sider>
        <Content style={{ height: "100%" }}>
          {/* {leaf ? <DataLeaf /> : <DataNode />} */}
          {selectedNode ? <DataLeaf node={selectedNode} /> : "请选中页面区块"}
        </Content>
        {rightClickNodeTreeItem !== null
          ? getNodeTreeRightClickMenu(rightClickNodeTreeItem)
          : null}
      </Layout>
    </PageWrapper>
  );
};
