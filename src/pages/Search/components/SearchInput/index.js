import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { doChangeSearch, doSubmitSearch } from '../../store/actionCreators';

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

const mapStateToProps = (state) => ({
    value: state.searchTerm
});

const mapDispatchToProps = (dispatch) => ({
    onChange: (event) => {
        dispatch(doChangeSearch(event.target.value));
    },
    onSubmit: dispatch(doSubmitSearch(event))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);

SearchInput.proptype = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.node,
    onSubmit: PropTypes.func.isRequired,
}