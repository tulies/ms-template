import React from "react";
import PageWrapper from "../../../components/PageWrapper";
import PageHeader from "../../../components/PageHeader";
class About extends React.PureComponent {
  render() {
    console.log(1212121);
    console.log("props: ", this.props);
    return (
      <PageWrapper>
        <PageHeader {...this.props} title="哈哈哈哈哈哈"></PageHeader>
        <h1>MORE-A页面</h1>
      </PageWrapper>
    );
  }
}
export default About;
