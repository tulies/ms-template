import React from "react";
import { Layout } from "antd";
// import { observer, inject } from "mobx-react";

import "./index.less";
import { getUserInfo } from "@/utils/authority";
import SiderMenu from "./SiderMenu";
import Header from "./Header";
import Welcome from "@/pages/Welcome";

const { Content } = Layout;

// @inject("store")
// @observer
class BasicLayout extends React.Component {
  state = {
    collapsed: false,
  };

  handleMenuCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    const {
      children,
      location: { pathname },
    } = this.props;
    console.log(this.props);
    return (
      <Layout>
        <SiderMenu collapsed={this.state.collapsed} {...this.props} />
        <Layout className="site-layout">
          <Header
            collapsed={this.state.collapsed}
            handleMenuCollapse={this.handleMenuCollapse}
            {...this.props}
          />
          <Content
            style={{
              margin: "18px 18px 0",
              minHeight: 280,
            }}
          >
            {pathname === "/" ? (
              <Welcome />
            ) : children ? (
              children
            ) : (
              "欢迎欢迎👏👏👏👏👏👏👏"
            )}
          </Content>
        </Layout>
      </Layout>
    );
  }
  // constructor(props) {
  //   console.log("componentWillMount", props);
  // }
  componentDidMount() {
    // const { history } = this.props;
    // const { userinfo } = store.User;
    const userinfo = getUserInfo();
    // 如果获取不到用户信息，跳转登录
    if (!(userinfo && userinfo.uid)) {
      // history.push("/user/login");
      window.location.replace("/user/login");
    }
  }
}
export default BasicLayout;
