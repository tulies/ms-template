import React from "react";
// import { Route } from "react-router-dom";

class More extends React.PureComponent {
  render() {
    console.log(this.props.routes);
    return (
      <div>
        <h1>MORE页面</h1>
        {this.props.children}

        {/* {
              this.props.routes.map((item,index)=>{
                  return <Route key={index} exact path={item.path} component={item.component}></Route>
              })
          } */}
      </div>
    );
  }
}
export default More;
