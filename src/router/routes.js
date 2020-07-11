import {
  ShopOutlined,
  TransactionOutlined,
  // SettingOutlined,
  HomeOutlined,
  MehOutlined,
} from "@ant-design/icons";
import BasicLayout from "@/layouts/BasicLayout";
import BlankLayout from "@/layouts/BlankLayout";
import UserLayout from "@/layouts/UserLayout";

// import Main from "../pages/Main";
import About from "@/pages/About";
import List from "@/pages/List";
// import More from "../pages/More";
import UserLogin from "@/pages/user/login";

// 平台管理 - 平台用户管理
import PlatUser from "@/pages/Sys/PlatUser";

const routes = [
  {
    path: "/user",
    component: UserLayout,
    routes: [
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
    routes: [
      {
        name: "平台管理",
        path: "/sys",
        component: BlankLayout,
        icon: MehOutlined,
        routes: [
          {
            name: "平台用户管理",
            path: "/sys/plat-user",
            component: PlatUser,
          },
          {
            name: "服务人员管理",
            path: "/sys/server-user",
            component: PlatUser,
          },
        ],
      },
      {
        name: "运营编辑",
        path: "/list",
        component: List,
        icon: HomeOutlined,
        routes: [
          {
            name: "首页推荐",
            path: "/list/a",
            component: PlatUser,
          },
          {
            name: "保养知识",
            path: "/list/b",
            component: PlatUser,
          },
          {
            name: "活动推荐",
            path: "/list/c",
            component: PlatUser,
          },
        ],
      },
      {
        name: "服务信息",
        path: "/test",
        component: BlankLayout,
        icon: ShopOutlined,
        routes: [
          {
            name: "服务信息",
            path: "/test/a",
            component: PlatUser,
          },
        ],
      },
      {
        name: "订单管理",
        path: "/about",
        component: About,
        icon: TransactionOutlined,
        routes: [
          {
            name: "订单列表",
            path: "/about/a",
            component: PlatUser,
          },
        ],
      },
    ],
  },
];
export default routes;
