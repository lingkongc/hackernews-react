import React, {Component} from 'react';
import {connect} from 'react-redux';
import {doChangeSearch, doSubmit} from '../../store/actionCreators';

class SearchInput extends Component {
    constructor(props) {
        super(props);
    }

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
                    onChange={(event) => onChange(event)}
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


const getValue = state => {
    return state.search.searchTerm
}

const mapStateToProps = (state) => ({
    value: getValue(state)
});

const mapDispatchToProps = (dispatch) => ({
    onChange: (event) => {
        dispatch(doChangeSearch(event.target.value));
    },
    onSubmit: (event) => {
        dispatch(doSubmit(event));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);