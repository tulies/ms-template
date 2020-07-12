import React from "react";
import { Layout } from "antd";
import "./index.less";

import SiderMenu from "./SiderMenu";
import Header from "./Header";

const { Content } = Layout;

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
    console.log("BasicLayout", this.props);
    const { children } = this.props;
    return (
      <Layout>
        <SiderMenu collapsed={this.state.collapsed} {...this.props} />
        <Layout className="site-layout">
          <Header
            collapsed={this.state.collapsed}
            handleMenuCollapse={this.handleMenuCollapse}
          />
          <Content
            style={{
              margin: "18px 18px 0",
              minHeight: 280,
            }}
          >
            {children ? children : "欢迎欢迎👏👏👏👏👏👏👏"}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default BasicLayout;
