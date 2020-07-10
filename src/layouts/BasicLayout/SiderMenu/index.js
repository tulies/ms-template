import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import routes from "../../../router/routes";
import { getIcon } from "../../../utils/getIcon";
import styles from "./index.module.less";

const { Sider } = Layout;
const { SubMenu } = Menu;

export default class SiderMenu extends React.PureComponent {
  /**
   * 获得菜单子节点
   * @memberof SiderMenu
   */
  getNavMenuItems = (menusData, parent) => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter((item) => item.name && !item.hideInMenu)
      .map((item) => {
        // make dom
        const ItemDom = this.getSubMenuOrItem(item, parent);
        // return this.checkPermissionItem(item.authority, ItemDom);
        return ItemDom;
      })
      .filter((item) => item);
  };

  /**
   * get SubMenu or Item
   */
  getSubMenuOrItem = (item) => {
    // doc: add hideChildrenInMenu
    if (
      item.routes &&
      !item.hideChildrenInMenu &&
      item.routes.some((child) => child.name)
    ) {
      const { name } = item;
      return (
        <SubMenu
          title={
            item.icon ? (
              <span>
                {getIcon(item.icon)}
                <span>{name}</span>
              </span>
            ) : (
              name
            )
          }
          key={item.path}
        >
          {this.getNavMenuItems(item.routes)}
        </SubMenu>
      );
    }
    return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>;
  };
  conversionPath = (path) => {
    if (path && path.indexOf("http") === 0) {
      return path;
    }
    return `/${path || ""}`.replace(/\/+/g, "/");
  };
  /**
   * 判断是否是http链接.返回 Link 或 a
   * Judge whether it is http link.return a or Link
   * @memberof SiderMenu
   */
  getMenuItemPath = (item) => {
    const { name } = item;
    const itemPath = this.conversionPath(item.path);
    const icon = getIcon(item.icon);
    const { target } = item;
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}
          <span>{name}</span>
        </a>
      );
    }
    // console.log("this.props", this.props);
    const { location, isMobile, onCollapse } = this.props;
    return (
      <Link
        to={itemPath}
        target={target}
        replace={itemPath === location.pathname}
        onClick={
          isMobile
            ? () => {
                onCollapse(true);
              }
            : undefined
        }
      >
        {icon}
        <span>{name}</span>
      </Link>
    );
  };

  render() {
    const { collapsed } = this.props;
    // const xxx = this.getNavMenuItems(routes[0].routes);
    // console.log("xxx", routes, xxx);

    return (
      <Sider
        id="components-layout-demo-side"
        trigger={null}
        collapsible
        collapsed={collapsed}
        className={styles.sider}
      >
        <div className={styles.logo}>
          <h1>天翼服务后台系统</h1>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          {this.getNavMenuItems(routes[1].routes)}
        </Menu>
      </Sider>
    );
  }
}
