import React, {Component} from 'react';
import PropTypes from 'prop-types';

// 函数式 无状态组件
// 没有生命周期方法
// 传入props 可以直接在函数签名中防伪props。返回一个jsx
// 初次之外利用箭头函数还可以进一步简写

class Search extends Component {
    componentDidMount() {
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


export default Search;

Search.proptype = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.node,
    onSubmit: PropTypes.func.isRequired,
}
