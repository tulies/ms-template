import React, { useState, useEffect } from "react";
import PageWrapper from "@/components/PageWrapper";
import { Layout, Menu } from "antd";

import PageHeader from "@/components/PageHeader";

import TreeSlider from "./TreeSlider";
// import DataLeaf from "./DataLeaf";
// import DataNode from "./DataNode";
import styles from "./index.module.less";
import DataLeaf from "./DataLeaf";
import RightMenu from "./views/RightMenu";
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
  const [rightClickNodeProps, setRightClickNodeProps] = useState(null);
  useEffect(() => {
    console.log("切换右侧页面");
    // return () => {
    //   alert("哈哈哈哈");
    // };
  }, [selectedNode]);

  // 渲染右键菜单

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
              setRightClickNodeProps({
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
        {/* 这里渲染右键菜单 */}
        {rightClickNodeProps !== null ? (
          <RightMenu
            rightClickNodeProps={rightClickNodeProps}
            onMouseLeave={() => {
              setRightClickNodeProps(null);
            }}
            onClick={({ event, node }) => {
              setRightClickNodeProps(null);
              console.log("触发菜单cick", event, node);
            }}
          />
        ) : null}
      </Layout>
    </PageWrapper>
  );
};
