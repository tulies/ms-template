import {
  ShopOutlined,
  TransactionOutlined,
  // SettingOutlined,
  HomeOutlined,
  MehOutlined,
} from "@ant-design/icons";
import BasicLayout from "@/layouts/BasicLayout";
import UserLayout from "@/layouts/UserLayout";

import OperatePage from "@/pages/Operate/Page";
import OperateTpl from "@/pages/Operate/Tpl";
import UserLogin from "@/pages/User/Login";

// 平台管理 - 平台用户管理
import SysUser from "@/pages/Sys/User";

const routes = [
  {
    path: "/user",
    component: UserLayout,
    children: [
      {
        name: "login",
        path: "/user/login",
        component: UserLogin,
        meta: {
          title: "商城首页",
        },
      },
    ],
  },
  {
    path: "/",
    layout: true,
    name: "首页",
    component: BasicLayout,
    // exact: true,
    children: [
      {
        name: "运营编辑",
        path: "/operate",
        // component: List,
        icon: HomeOutlined,
        children: [
          {
            name: "页面维护",
            path: "/operate/page",
            component: OperatePage,
          },
          {
            name: "模板维护",
            path: "/operate/tpl",
            component: OperateTpl,
          },
        ],
      },
      {
        name: "平台管理",
        path: "/sys",
        // component: BlankLayout,
        icon: MehOutlined,
        children: [
          {
            name: "平台用户管理",
            path: "/sys/user",
            component: SysUser,
          },
        ],
      },
      {
        name: "服务信息",
        path: "/test",
        // component: BlankLayout,
        icon: ShopOutlined,
        children: [
          {
            name: "服务信息",
            path: "/test/a",
            component: SysUser,
          },
        ],
      },
      {
        name: "订单管理",
        path: "/about",
        // component: About,
        icon: TransactionOutlined,
        children: [
          {
            name: "订单列表",
            path: "/about/a",
            component: SysUser,
          },
        ],
      },
    ],
  },
];
export default routes;
