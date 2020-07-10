import React from 'react';

import logo from '../../assets/img/logo.svg';
import '../../assets/css/App.less';
import {observer, inject} from 'mobx-react';
import { Button } from 'antd';

// React.Component 和 React.PureComponent 有什么区别 -> https://segmentfault.com/a/1190000015575024
@inject('store')
@observer
class Main extends React.PureComponent {
  render() {
    const { store } = this.props;
    console.log(store.test)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit
            {' '}
            <code>src/pages/main/index.js</code>
            {' '}
            and save to reload.
          </p>
          <Button type="primary">Primary Button</Button>
        </header>
      </div>
    );
  }
}

export default Main;
