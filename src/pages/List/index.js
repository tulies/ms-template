import React from "react";
class Test extends React.PureComponent {
  state = {
    total: 0,
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ total: 5 });
    });
  }
  render() {
    console.log("list list");
    return (
      <div>
        <h1>列表页面</h1>
      </div>
    );
  }
}
export default Test;
