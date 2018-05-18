import React from 'react';

// 函数式 无状态组件
// 没有生命周期方法
// 传入props 可以直接在函数签名中防伪props。返回一个jsx
// 初次之外利用箭头函数还可以进一步简写

const Search = ({value, onChange, children, onSubmit}) =>
    /*
    * this.porps.children 可以将元素从上层传递到你的组价中
    * 为组件相互组合提供了可能性，可以传递其他组件 元素树 元素
    * */
    <form onSubmit={onSubmit}>
        <input
            type="text"
            onChange={onChange}
            value={value}
        />
        <button type="submit">
            {children}
        </button>
    </form>


export default Search;