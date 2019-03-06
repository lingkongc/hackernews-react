import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App/>, document.getElementById('root')); // ReactDom.render()可以多次调用
registerServiceWorker();

// 模块热替换 HMR
if (module.hot) {
    module.hot.accept();
}