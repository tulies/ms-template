import React from "react";
import { Tree } from "antd";
import { DownOutlined } from "@ant-design/icons";
const { TreeNode } = Tree;
export default () => {
  return (
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
  );
};
