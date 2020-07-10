import React from "react";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import { Layout, Tooltip, Menu, Dropdown, Avatar } from "antd";
import styles from "./index.module.less";
const { Header } = Layout;
export default class LayoutHeader extends React.PureComponent {
  onMenuClick() {}
  render() {
    const { collapsed, handleMenuCollapse } = this.props;

    const menu = (
      <Menu
        className={styles.menu}
        selectedKeys={[]}
        onClick={this.onMenuClick}
      >
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
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: styles.trigger,
            onClick: handleMenuCollapse,
          }
        )}
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
  }
}
