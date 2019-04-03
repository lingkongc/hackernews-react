import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';

ReactDOM.render(
    <App/>, document.getElementById('root')
);

// ReactDom.render()可以多次调用
// 模块热替换 HMR
if (module.hot) {
    module.hot.accept();
}