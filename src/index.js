import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './components/App';

ReactDOM.render(
    <App/>, document.getElementById('root')
);

// ReactDom.render()可以多次调用
// 模块热替换 HMR 理论上都要写，但是有些库已经默认写了这个方法
if (module.hot) {
    module.hot.accept();
}