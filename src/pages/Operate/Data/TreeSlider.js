import React, { useState, useEffect } from "react";
import { Tree } from "antd";
import { useStore } from "@/store/uses";
const { DirectoryTree } = Tree;
// const initTreeDate = [
//   {
//     title: "Expand to load",
//     key: "0",
//   },
//   {
//     title: "Expand to load",
//     key: "1",
//   },
//   {
//     title: "Tree Node",
//     key: "2",
//     isLeaf: true,
//   },
// ]; // It's just a simple demo. You can use tree map to optimize update perf.

const updateTreeData = (list, key, children) => {
  return list.map((node) => {
    if (node.key === key) {
      return { ...node, children };
    }
    if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, key, children),
      };
    }

    return node;
  });
};

export default () => {
  const localStore = useStore();
  // const loadTreeList = () => {

  // };
  // 展开节点时候会调用这个
  const onLoadData = ({ key, children }) => {
    console.log("onLoadData", { key, children });
    return new Promise((resolve) => {
      if (children) {
        resolve();
        return;
      }

      localStore.Operate.queryOperateNodeList({ parentNid: key }).then(
        (res) => {
          console.log(res);
          if (res.code === 0) {
            // setTreeData(res.data.list);

            setTreeData((origin) => updateTreeData(origin, key, res.data.list));
          }
          resolve();
        }
      );
    });
  };

  const [selectedKey, setSelectedKey] = useState([]);
  const [treeData, setTreeData] = useState([]);
  // const [parentNid, setParentId] = useState(0);

  useEffect(() => {
    localStore.Operate.queryOperateNodeList({ parentNid: 0 }).then((res) => {
      console.log(res);
      if (res.code === 0) {
        setTreeData(res.data.list);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("切换右侧页面");
  }, [selectedKey]);

  return (
    <Tree
      selectedKeys={[selectedKey]}
      showLine={true}
      blockNode={true}
      loadData={onLoadData}
      treeData={treeData}
      onLoad={(loadedKeys, { event, node }) => {
        console.log("onLoad", loadedKeys, { event, node });
      }}
      onRightClick={({ event, node }) => {
        console.log("onRightClick", event, node);
      }}
      onSelect={(selectedKeys, { selected, selectedNodes, node, event }) => {
        setSelectedKey(node.key);
        console.log("onSelect", selectedKeys, {
          selected,
          selectedNodes,
          node,
          event,
        });
      }}
      onExpand={(expandedKeys, { expanded, node }) => {
        console.log("onExpand	", expandedKeys, { expanded, node });
      }}
    />
  );
};
