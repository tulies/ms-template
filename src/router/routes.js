import {
  ShopOutlined,
  TransactionOutlined,
  SettingOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import BasicLayout from "../layouts/BasicLayout";
import BlankLayout from "../layouts/BlankLayout";
import UserLayout from "../layouts/UserLayout";
// import Main from "../pages/Main";
import About from "../pages/About";
import List from "../pages/List";
// import More from "../pages/More";
import MoreA from "../pages/More/A";
import UserLogin from "../pages/user/login";
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
        name: "运营编辑",
        path: "/list",
        component: List,
        icon: HomeOutlined,
        routes: [
          {
            name: "首页推荐",
            path: "/list/a",
            component: MoreA,
          },
          {
            name: "保养知识",
            path: "/list/b",
            component: MoreA,
          },
          {
            name: "活动推荐",
            path: "/list/c",
            component: MoreA,
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
            component: MoreA,
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
            component: MoreA,
          },
        ],
      },
      {
        name: "设置",
        path: "/more",
        component: BlankLayout,
        icon: SettingOutlined,
        routes: [
          {
            name: "A页面",
            path: "/more/a",
            component: MoreA,
          },
        ],
      },
    ],
  },
];
export default routes;
