import React from "react";
import styles from "../index.module.less";

export default (props) => {
  //   console.log(params);
  const { rightClickNodeProps, onMouseLeave, onClick } = props;
  const { pageX, pageY, node } = rightClickNodeProps;
  const tmpStyle = {
    position: "absolute",
    left: `${pageX - 3}px`,
    top: `${pageY - 3}px`,
    zIndex: 1000,
  };
  const menu = (
    <div
      className={styles.rightClickMenu}
      style={tmpStyle}
      onMouseLeave={() => {
        if (onMouseLeave) onMouseLeave();
      }}
    >
      <ul>
        {!node.leaf ? (
          <li
            onClick={() => {
              if (onClick) onClick({ event: "newPage", node: node });
            }}
          >
            新建页面
          </li>
        ) : null}
        {!node.leaf ? (
          <li
            onClick={() => {
              if (onClick) onClick({ event: "newNode", node: node });
            }}
          >
            新建节点
          </li>
        ) : null}

        <li
          onClick={() => {
            if (onClick) onClick({ event: "edit", node: node });
          }}
        >
          编辑
        </li>
        <li
          onClick={() => {
            if (onClick) onClick({ event: "delete", node: node });
          }}
        >
          删除
        </li>
        <li
          onClick={() => {
            if (onClick) onClick({ event: "refresh", node: node });
          }}
        >
          刷新
        </li>
      </ul>
    </div>
  );
  return menu;
};
