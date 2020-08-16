import React, { useState, useEffect, useImperativeHandle } from "react";
import { Tree, Layout } from "antd";
// import { DownOutlined, FolderAddOutlined } from "@ant-design/icons";
import { useStore } from "@/store/uses";
import RightMenu from "./views/RightMenu";
import AddNodePage from "./views/AddNodePage";
import EditNodePage from "./views/EditNodePage";
import styles from "./index.module.less";
const { Sider } = Layout;
const { DirectoryTree } = Tree;

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
  const { onSelect, cRef } = props;
  const localStore = useStore();
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
            if (res.data.list) {
              const childNids = res.data.list.map((v) => v.nid);
              setLoadedKeys((origin) =>
                origin.filter((v) => !childNids.includes(v))
              );
              setExpandedKeys((origin) =>
                origin.filter((v) => !childNids.includes(v))
              );
            }

            setTreeData((origin) => updateTreeData(origin, key, res.data.list));
          }
          resolve();
        }
      );
    });
  };
  const refreshData = ({ node }) => {
    console.log(node);
    // 把孩子节点展开收起，loaded也去掉。
    // 递归清除展开和收起

    localStore.Operate.queryOperateNodeList({
      parentNid: node.nid,
    }).then((res) => {
      console.log(res);
      if (res.code === 0) {
        // setTreeData(res.data.list);
        if (res.data.list) {
          const childNids = res.data.list.map((v) => v.nid);
          setLoadedKeys((origin) =>
            origin.filter((v) => !childNids.includes(v))
          );
          setExpandedKeys((origin) =>
            origin.filter((v) => !childNids.includes(v))
          );
        }

        setTreeData((origin) => {
          console.log(origin);
          return updateTreeData(origin, node.nid, res.data.list);
        });
      }
    });
  };
  const [selectedKey, setSelectedKey] = useState([]);
  const [loadedKeys, setLoadedKeys] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [treeData, setTreeData] = useState([]);
  const [rightClickNodeProps, setRightClickNodeProps] = useState(null);

  // 新增窗口
  const [showAddNodePage, setShowAddNodePage] = useState(false);
  const [newLeaf, setNewLeaf] = useState(0);
  const [curOperateNode, setCurOperateNode] = useState("");

  // 更新窗口
  const [showEditNodePage, setShowEditNodePage] = useState(false);

  useEffect(() => {
    localStore.Operate.queryOperateNodeList({ parentNid: 0 }).then((res) => {
      console.log(res);
      if (res.code === 0) {
        setTreeData(res.data.list);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useImperativeHandle(cRef, () => ({
    // changeVal 就是暴露给父组件的方法
    // showAddNodePage: ({ parentNid }) => {
    //   setNewLeaf(0);
    //   setParentNid(node.nid);
    //   setShowAddNodePage(true);
    // },
  }));

  const onRightClick = ({ event, node }) => {
    // console.log("onRightClick", event);
    // onRightClick({ event, node });
    setRightClickNodeProps({
      pageX: event.pageX,
      pageY: event.pageY,
      node,
    });
  };
  return (
    <React.Fragment>
      <Sider className={styles.treeSlider}>
        <DirectoryTree
          className="tree"
          selectedKeys={[selectedKey]}
          loadedKeys={loadedKeys}
          expandedKeys={expandedKeys}
          // showLine={true}
          // switcherIcon={<DownOutlined />}
          // showIcon={true}
          // icon={<FolderAddOutlined />}
          blockNode={true}
          loadData={onLoadData}
          treeData={treeData}
          onLoad={(loadedKeys, { event, node }) => {
            console.log("onLoad", loadedKeys, { event, node });
            setLoadedKeys(loadedKeys);
          }}
          onRightClick={onRightClick}
          onSelect={(
            selectedKeys,
            { selected, selectedNodes, node, event }
          ) => {
            setSelectedKey(node.key);
            // 把当前点击的节点回调回去
            onSelect({ node });
          }}
          onExpand={(expandedKeys, { expanded, node }) => {
            console.log("onExpand	", expandedKeys, { expanded, node });
            setExpandedKeys(expandedKeys);
          }}
        />
      </Sider>

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
            if (event === "refresh") {
              console.log("refresh");
              refreshData({ node });
            } else if (event === "newPage") {
              console.log("newPage");
              setNewLeaf(1);
              setCurOperateNode(node);
              setShowAddNodePage(true);
            } else if (event === "newNode") {
              console.log("newNode");
              setNewLeaf(0);
              setCurOperateNode(node);
              setShowAddNodePage(true);
            } else if (event === "edit") {
              console.log("edit node");
              setCurOperateNode(node);
              setShowEditNodePage(true);
            }
          }}
        />
      ) : null}

      {showAddNodePage ? (
        <AddNodePage
          visible={showAddNodePage}
          newLeaf={newLeaf}
          parentNode={curOperateNode}
          handleOk={() => {
            setShowAddNodePage(false);
            refreshData({ node: curOperateNode });
          }}
          handleClose={() => {
            setShowAddNodePage(false);
          }}
        />
      ) : null}

      {showEditNodePage ? (
        <EditNodePage
          visible={showEditNodePage}
          node={curOperateNode}
          handleOk={(res) => {
            setShowEditNodePage(false);
            refreshData({ node: { nid: curOperateNode.parentNid } });

            // refreshData({ node: curOperateNode });
          }}
          handleClose={() => {
            setShowEditNodePage(false);
          }}
        />
      ) : null}
    </React.Fragment>
  );
};
