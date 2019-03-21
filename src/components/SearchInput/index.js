import React, {Component} from 'react';
import PropTypes from 'prop-types';

// 函数式 无状态组件
// 没有生命周期方法
// 传入props 可以直接在函数签名中防伪props。返回一个jsx
// 初次之外利用箭头函数还可以进一步简写

class SearchInput extends Component {
    // 声明周期 组件加载完毕后触发 获取焦点
    componentDidMount() {
        // 这里的this.input绑定的应该是input元素
        if (this.input) {
            this.input.focus();
        }
    }

    render() {
        const {
            value,
            onChange,
            onSubmit,
            children
        } = this.props;

        return (
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    ref={(node) => {
                        this.input = node;
                    }}
                />
                <button type="submit">
                    {children}
                </button>
            </form>
        );
    }
}


export default SearchInput;

SearchInput.proptype = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.node,
    onSubmit: PropTypes.func.isRequired,
}
