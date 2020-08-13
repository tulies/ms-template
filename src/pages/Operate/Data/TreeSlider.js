import React, { useState, useEffect } from "react";
import { Tree } from "antd";
import { useStore } from "@/store/uses";

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

export default (props) => {
  const { onSelect, onRightClick } = props;
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

  // useEffect(() => {
  //   console.log("切换右侧页面");
  // }, [selectedKey]);
  // console.log("重复渲染下吗");
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
        // console.log("onRightClick", event);
        onRightClick({ event, node });
      }}
      onSelect={(selectedKeys, { selected, selectedNodes, node, event }) => {
        setSelectedKey(node.key);
        // 把当前点击的节点回调回去
        onSelect({ node });
      }}
      onExpand={(expandedKeys, { expanded, node }) => {
        console.log("onExpand	", expandedKeys, { expanded, node });
      }}
    />
  );
};
