import React from "react";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import { Layout, Tooltip, Menu, Dropdown, Avatar, message } from "antd";
import styles from "./index.module.less";
const { Header } = Layout;

export default (props) => {
  const { collapsed, handleMenuCollapse } = props;
  console.log(props);
  const onMenuClick = ({ key }) => {
    const { history } = props;

    console.log(key);
    if (key === "modifyPass") {
      // history.push("/user/login");
      message.info("修改密码");
    } else if (key === "logout") {
      history.push("/user/login");
    }
  };
  const menu = (
    <Menu className={styles.menu} onClick={onMenuClick}>
      <Menu.Item key="modifyPass">
        <SettingOutlined />
        修改密码
      </Menu.Item>

      <Menu.Item key="logout">
        <ExportOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className={styles.header}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: styles.trigger,
        onClick: handleMenuCollapse,
      })}
      <div className={styles.right}>
        <Tooltip title="使用文档">
          <a
            target="_blank"
            href="https://www.showdoc.cc/web/#/115656989267119"
            rel="noopener noreferrer"
            className={styles.action}
          >
            <QuestionCircleOutlined />{" "}
          </a>
        </Tooltip>
        <Dropdown overlay={menu}>
          <span className={`${styles.action} ${styles.account}`}>
            <Avatar
              size="small"
              className={styles.avatar}
              src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
            />
            <span className={styles.name}>王嘉炀</span>
          </span>
        </Dropdown>
        {/* <Spin size="small" style={{ marginLeft: 8 }} /> */}

        {/* {currentUser.nickname ? (
          <Dropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
              <Avatar
                size="small"
                className={styles.avatar}
                src={currentUser.avatar}
              />
              <span className={styles.name}>{currentUser.nickname}</span>
            </span>
          </Dropdown>
        ) : (
          <Spin size="small" style={{ marginLeft: 8 }} />
        )} */}
        {/* <SelectLang className={styles.action} /> */}
      </div>
    </Header>
  );
};
