import React from 'react';
import {connect} from 'react-redux';
import {doChangeSearch, fetchPostsIfNeeded} from '../../actions/search';

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.onSubmitValue = this.onSubmitValue.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);
    }

    componentDidMount() {
        const {
            onSubmitSearch,
            searchTerm
        } = this.props;
        onSubmitSearch(searchTerm);
        if (this.input) {
            this.input.focus();
        }
    }

    onSubmitValue(event) {
        const {
            onSubmitSearch,
            searchTerm
        } = this.props;
        onSubmitSearch(searchTerm);
        event.preventDefault();
    }

    onChangeValue(event) {
        const {
            onChangeSearch
        } = this.props;
        onChangeSearch(event.target.value);
    }

    render() {
        const {
            searchTerm,
        } = this.props;
        return (
            <form onSubmit={this.onSubmitValue}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={this.onChangeValue}
                    ref={node => {
                        this.input = node
                    }}
                />
                <button type="submit">搜索</button>
            </form>
        )
    }
}

const mapStateToProps = state => ({
    searchTerm: state.searchState.searchTerm
})

const mapDispatchToProps = dispatch => ({
    onChangeSearch: searchTerm => {
        dispatch(doChangeSearch(searchTerm))
    },
    onSubmitSearch: searchTerm => {
        dispatch(fetchPostsIfNeeded(searchTerm));
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Search);