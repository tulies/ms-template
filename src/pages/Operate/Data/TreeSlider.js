import React, { useState, useEffect } from "react";
import { Tree } from "antd";
import { useStore } from "@/store/uses";
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
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    localStore.Operate.queryOperateNodeList().then((res) => {
      console.log(res);
      if (res.code === 0) {
        setTreeData(res.data.list);
      }
    });
  }, []);

  function onLoadData({ key, children }) {
    return new Promise((resolve) => {
      if (children) {
        resolve();
        return;
      }

      setTimeout(() => {
        setTreeData((origin) =>
          updateTreeData(origin, key, [
            {
              title: "Child Node",
              key: `${key}-0`,
            },
            {
              title: "Child Node",
              key: `${key}-1`,
            },
          ])
        );
        resolve();
      }, 1000);
    });
  }

  return <Tree showLine loadData={onLoadData} treeData={treeData} />;
};
