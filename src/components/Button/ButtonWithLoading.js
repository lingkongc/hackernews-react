import React from 'react';
import Loading from '../Loading/';
import Button from './Button';

// Higher Order Components
// 高阶组件 输入一个组件 并输出一个更高级的组件 通常以with开头
// function withFoo(Component) {
//     return function (props) {
//         return <Component {...props} />
//     }
// }


// 解构赋值 ..rest
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// ...rest用于获取函数多余参数
const withLoading = (Component) => ({isLoading, ...rest}) =>
    isLoading
        ? <Loading/>
        : <Component {...rest} />;

const ButtonWithLoading = withLoading(Button);

export default ButtonWithLoading;