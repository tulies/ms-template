import React, { useRef, useEffect } from "react";
import PageWrapper from "@/components/PageWrapper";
import { Tabs, Tree, Layout } from "antd";

import {
  // FolderOutlined,
  // FolderOpenOutlined,
  DownOutlined,
  // ProfileOutlined,
  FormOutlined,
  CodeOutlined,
  // EyeOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import styles from "./index.module.less";
// import * as monaco from "monaco-editor";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import PageHeader from "@/components/PageHeader";

const { TabPane } = Tabs;
const { TreeNode } = Tree;
const { Sider, Content } = Layout;

// monaco-editor 如何使用 ：https://zhuanlan.zhihu.com/p/47746336
export default (props) => {
  const monacoEditor = useRef();
  useEffect(() => {
    console.log(monacoEditor.current);
    console.log("componentDidMount");
    const editor = monaco.editor.create(monacoEditor.current, {
      value: '{"code":0,"msg":"系统错误，请重试"}',
      language: "json",

      // lineNumbers: "off",
      // roundedSelection: false,
      // scrollBeyondLastLine: false,
      readOnly: false,
      // theme: "vs-dark",
    });
  }, []);
  return (
    <PageWrapper>
      <PageHeader
        {...props}
        // title="区块推荐数据维护"
        // hiddenBreadcrumb={true}
      ></PageHeader>
      <Layout className={styles.playground}>
        <Sider className={styles.treeSlider}>
          <Tree
            showIcon={true}
            showLine
            switcherIcon={<DownOutlined />}
            defaultExpandedKeys={["0-0-0"]}
            onSelect={() => {}}
          >
            <TreeNode title="parent 1" key="0-0">
              <TreeNode title="parent 1-0" key="0-0-0" isLeaf={false}>
                <TreeNode title="leaf" key="0-0-0-0" />
                <TreeNode title="leaf" key="0-0-0-1" />
                <TreeNode title="leaf" key="0-0-0-2" />
              </TreeNode>
              <TreeNode title="parent 1-1" key="0-0-1" isLeaf={false}>
                <TreeNode title="leaf" key="0-0-1-0" />
              </TreeNode>
              <TreeNode title="parent 1-2" key="0-0-2" isLeaf={false}>
                <TreeNode title="leaf" key="0-0-2-0" />
                <TreeNode title="leaf" key="0-0-2-1" />
              </TreeNode>
            </TreeNode>
          </Tree>
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
              <div ref={monacoEditor} className={styles.codeEditor}></div>
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
              Content of card tab 3
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
              Content of card tab 2
            </TabPane>
          </Tabs>
        </Content>
      </Layout>
    </PageWrapper>
  );
};
