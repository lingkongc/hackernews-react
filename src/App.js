import React, {Component} from 'react';
import './App.css';

import Table from './Table';
import Search from './Search';
import Button from './Button';


const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '50';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

// const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}&${PARAM_PAGE}`


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // 属性名与变量名一致的时候可以简写
            result: null,
            searchTerm: DEFAULT_QUERY,
        };

        this.setSearchTopStories = this.setSearchTopStories.bind(this);
        this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
        // 绑定到类方法
        // 使用bind()是为了将this绑定到类实例，，类方法不会自动绑定this到实例上。会无法调用state的。
        this.onDismiss = this.onDismiss.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    // 设置result
    setSearchTopStories(result) {
        const {hits, page} = result;

        const oldHits = page !== 0
            ? this.state.result.hits
            : [];

        const updatedHits = [
            ...oldHits,
            ...hits
        ];

        this.setState({
            result: {hits: updatedHits, page}
        });
    }

    fetchSearchTopStories(searchTerm, page = 0) {
        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
            .then(response => response.json())
            .then(result => this.setSearchTopStories(result))
            .catch(e => e)
    }

    componentDidMount() {
        const {searchTerm} = this.state;
        this.fetchSearchTopStories(searchTerm);
    }

    // 方法初始化简写形式
    onDismiss(id) {
        // 结果为false
        const isNotId = item => item.objectID !== id;
        // filter函数遍历数字，传入函数，如果判断是true则保留, 最后返回结果数组，并不会改变原数组
        const updatedHits = this.state.result.hits.filter(isNotId);
        // this.setState = ({
        //     result: Object.assign({}, this.state.result, {hits: updatedHits}),
        // });
        this.setState({
            result: {...this.state.result, hits: updatedHits}
        })
    }


    onSearchChange(event) {
        // 这里可以访问到事件对象
        this.setState({
            searchTerm: event.target.value
        })
    }

    onSearchSubmit(event) {
        const {searchTerm} = this.state;
        this.fetchSearchTopStories(searchTerm);
        event.preventDefault();
    }


    render() {
        // 解构 相当于searchTerm=this.state.serchTerm... 对于数组变量对象都适用
        const {searchTerm, result} = this.state;
        const page = (result && result.page) || 0;
        return (
            <div className="page">
                <div className="interactions">
                    <Search
                        value={searchTerm}
                        onChange={this.onSearchChange}
                        onSubmit={this.onSearchSubmit}
                    >Search</Search>
                </div>

                {
                    result &&
                    <Table
                        list={result.hits}
                        // pattern={searchTerm}
                        onDismiss={this.onDismiss}
                    />
                }

                <div className="interactions">
                    <Button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}>
                        More
                    </Button>
                </div>
            </div>
        );
    }
}

export default App;
