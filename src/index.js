import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/index.less";
import { Provider } from "mobx-react";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import store from "./store";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./data/mock/api";
// require("./data/mock/api.js");
ReactDOM.render(
  // <React.StrictMode></React.StrictMode>

  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
