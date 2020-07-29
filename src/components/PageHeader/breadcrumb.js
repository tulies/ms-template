import React, { PureComponent, createElement } from "react";
import pathToRegexp from "path-to-regexp";
import { Breadcrumb } from "antd";
import styles from "./index.module.less";
import { urlToList } from "../_utils/pathTools";
import { HomeOutlined } from "@ant-design/icons";
import routes from "@/router/routes";

export const getBreadcrumb = (breadcrumbNameMap, url) => {
  let breadcrumb = breadcrumbNameMap[url];
  if (!breadcrumb) {
    Object.keys(breadcrumbNameMap).forEach((item) => {
      if (pathToRegexp(item).test(url)) {
        breadcrumb = breadcrumbNameMap[item];
      }
    });
  }
  return breadcrumb || {};
};

export default class BreadcrumbView extends PureComponent {
  state = {
    breadcrumb: null,
  };
  /**
   * 获取面包屑映射
   * @param {Object} menuData 菜单配置
   */
  getBreadcrumbNameMap() {
    const routerMap = {};
    const mergeMenuAndRouter = (data) => {
      data.forEach((menuItem) => {
        if (menuItem.children) {
          mergeMenuAndRouter(menuItem.children);
        }
        // Reduce memory usage
        routerMap[menuItem.path] = menuItem;
      });
    };
    mergeMenuAndRouter(routes[1].children);
    return routerMap;
  }
  componentDidMount() {
    // const routerMap = this.getBreadcrumbNameMap();
    // console.log(routerMap);
    this.getBreadcrumbDom();
  }

  componentDidUpdate(preProps) {
    const { location } = this.props;
    if (!location || !preProps.location) {
      return;
    }
    const prePathname = preProps.location.pathname;
    if (prePathname !== location.pathname) {
      this.getBreadcrumbDom();
    }
  }

  getBreadcrumbDom = () => {
    const breadcrumb = this.conversionBreadcrumbList();
    this.setState({
      breadcrumb,
    });
  };

  getBreadcrumbProps = () => {
    const { routes, params, location, breadcrumbNameMap } = this.props;
    return {
      routes,
      params,
      routerLocation: location,
      breadcrumbNameMap,
    };
  };

  // Generated according to props
  conversionFromProps = () => {
    const {
      breadcrumbList,
      breadcrumbSeparator,
      itemRender,
      linkElement = "a",
    } = this.props;
    return (
      <Breadcrumb separator={breadcrumbSeparator}>
        {breadcrumbList.map((item) => {
          const title = itemRender ? itemRender(item) : item.title;
          return (
            <Breadcrumb.Item key={item.title}>
              {item.href
                ? createElement(
                    linkElement,
                    {
                      [linkElement === "a" ? "href" : "to"]: item.href,
                    },
                    title
                  )
                : title}
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    );
  };

  conversionFromLocation = (routerLocation, breadcrumbNameMap) => {
    const {
      breadcrumbSeparator,
      home,
      itemRender,
      linkElement = "a",
    } = this.props;
    // Convert the url to an array
    const pathSnippets = urlToList(routerLocation.pathname);
    // Loop data mosaic routing
    const extraBreadcrumbItems = pathSnippets.map((url, index) => {
      console.log("--------", url, index);
      const currentBreadcrumb = getBreadcrumb(breadcrumbNameMap, url);
      console.log("--------", currentBreadcrumb);

      if (currentBreadcrumb.inherited) {
        return null;
      }
      const isLinkable =
        index !== pathSnippets.length - 1 && currentBreadcrumb.component;
      const name = itemRender
        ? itemRender(currentBreadcrumb)
        : currentBreadcrumb.name;
      return currentBreadcrumb.name && !currentBreadcrumb.hideInBreadcrumb ? (
        <Breadcrumb.Item key={url}>
          {createElement(
            isLinkable ? linkElement : "span",
            { [linkElement === "a" ? "href" : "to"]: url },
            name
          )}
        </Breadcrumb.Item>
      ) : null;
    });
    // Add home breadcrumbs to your head
    extraBreadcrumbItems.unshift(
      <Breadcrumb.Item key="home">
        {createElement(
          linkElement,
          {
            [linkElement === "a" ? "href" : "to"]: "/",
          },
          home || <HomeOutlined />
        )}
      </Breadcrumb.Item>
    );
    console.log("extraBreadcrumbItems-----", extraBreadcrumbItems);
    return (
      <Breadcrumb className={styles.breadcrumb} separator={breadcrumbSeparator}>
        {extraBreadcrumbItems}
      </Breadcrumb>
    );
  };

  /**
   * 将参数转化为面包屑
   * Convert parameters into breadcrumbs
   */
  conversionBreadcrumbList = () => {
    const { breadcrumbList, breadcrumbSeparator } = this.props;
    console.log({ breadcrumbList, breadcrumbSeparator });
    const {
      routes,
      params,
      routerLocation,
      breadcrumbNameMap,
    } = this.getBreadcrumbProps();
    if (breadcrumbList && breadcrumbList.length) {
      return this.conversionFromProps();
    }

    // 如果传入 routes 和 params 属性
    // If pass routes and params attributes
    if (routes && params) {
      return (
        <Breadcrumb
          className={styles.breadcrumb}
          routes={routes.filter((route) => route.breadcrumbName)}
          params={params}
          itemRender={this.itemRender}
          separator={breadcrumbSeparator}
        />
      );
    }
    console.log({ routes, params, routerLocation, breadcrumbNameMap });

    // return null;
    // 根据 location 生成 面包屑
    // Generate breadcrumbs based on location
    if (routerLocation && routerLocation.pathname) {
      return this.conversionFromLocation(
        routerLocation,
        this.getBreadcrumbNameMap()
      );
    }
    return null;
  };

  // 渲染Breadcrumb 子节点
  // Render the Breadcrumb child node
  itemRender = (route, params, routes, paths) => {
    const { linkElement = "a" } = this.props;
    const last = routes.indexOf(route) === routes.length - 1;
    return last || !route.component ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      createElement(
        linkElement,
        {
          href: paths.join("/") || "/",
          to: paths.join("/") || "/",
        },
        route.breadcrumbName
      )
    );
  };

  render() {
    const { breadcrumb } = this.state;
    return breadcrumb;

    // return (
    //   <Breadcrumb>
    //     <Breadcrumb.Item href="">
    //       <HomeOutlined />
    //     </Breadcrumb.Item>
    //     <Breadcrumb.Item href="">
    //       <UserOutlined />
    //       <span>Application List</span>
    //     </Breadcrumb.Item>
    //     <Breadcrumb.Item>Application</Breadcrumb.Item>
    //   </Breadcrumb>
    // );
  }
}
