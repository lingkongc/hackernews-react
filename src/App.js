import React, {Component} from 'react';
import './App.css';

import Table from './Table';
import Search from './Search';
import Button from './Button';
import Loading from './Loading';
import fetch from 'isomorphic-fetch';


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
            results: null,
            searchKey: '',
            searchTerm: DEFAULT_QUERY,
            error: null,
            isLoading: false,
        };

        this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
        this.setSearchTopStories = this.setSearchTopStories.bind(this);
        this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
        // 绑定到类方法
        // 使用bind()是为了将this绑定到类实例，，类方法不会自动绑定this到实例上。会无法调用state的。
        this.onDismiss = this.onDismiss.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    // 如果存在缓存的serachTerm 则返沪false
    needsToSearchTopStories(searchTerm) {
        return !this.state.results[searchTerm];
    }

    // 发送请求后设置result
    setSearchTopStories(result) {
        // result是返回的数据
        const {hits, page} = result;
        const {searchKey, results} = this.state;

        const oldHits = results && results[searchKey]
            ? results[searchKey].hits
            : [];

        // 将过去的项目和新的项目合并到新的数组
        const updatedHits = [
            ...oldHits,
            ...hits
        ];

        // 将新的搜索合并到results，如果存在该对象，则覆盖
        this.setState({
            results: {
                ...results,
                [searchKey]: {hits: updatedHits, page}
            },
            isLoading: false
        });
    }

    fetchSearchTopStories(searchTerm, page = 0) {
        this.setState({isLoading: true});
        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
            .then(response => response.json())
            .then(result => this.setSearchTopStories(result))
            .catch(e => this.setState({error: e}));
    }

    componentDidMount() {
        const {searchTerm} = this.state;
        this.setState({searchKey: searchTerm});
        this.fetchSearchTopStories(searchTerm);
    }

    // 方法初始化简写形式
    onDismiss(id) {
        const {searchKey, results} = this.state;
        const {hits, page} = results[searchKey];

        // 结果为false
        const isNotId = item => item.objectID !== id;
        // filter函数遍历数字，传入函数，如果判断是true则保留, 最后返回结果数组，并不会改变原数组
        const updatedHits = hits.filter(isNotId);
        // this.setState = ({
        //     result: Object.assign({}, this.state.result, {hits: updatedHits}),
        // });
        this.setState({
            results: {
                ...results,
                [searchKey]: {hits: updatedHits, page}
            }
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
        this.setState({searchKey: searchTerm});
        // 重新设置state触发渲染 如果不存在searchTerm则重新发送请求
        // 如果不存在则会给list渲染一个空数组，发送请求后给数组添加内容
        if (this.needsToSearchTopStories(searchTerm)) {
            this.fetchSearchTopStories(searchTerm);
        }
        event.preventDefault();
    }


    render() {
        // 解构 相当于searchTerm=this.state.serchTerm... 对于数组变量对象都适用
        const {
            searchTerm,
            results,
            searchKey,
            error,
            isLoading,
        } = this.state;

        const page = (
            results &&
            results[searchKey] &&
            results[searchKey].page
        ) || 0;

        const list = (
            results &&
            results[searchKey] &&
            results[searchKey].hits
        ) || [];

        // 当发生错误的时候 使用条件渲染输出提示信息
        // if(error){
        //     return <p>Something went wrong.</p>
        // }

        return (
            <div className="page">
                <div className="interactions">
                    <Search
                        value={searchTerm}
                        onChange={this.onSearchChange}
                        onSubmit={this.onSearchSubmit}
                    >Search</Search>
                </div>
                {/*条件渲染，请求失败的话*/}
                {
                    error
                        ? <div className="interactions">
                            <p>Something went wrong.</p>
                        </div>
                        : <Table
                            list={list}
                            // pattern={searchTerm}
                            onDismiss={this.onDismiss}
                        />
                }

                <div className="interactions">
                    {
                        isLoading
                            ? <Loading/>
                            : <Button onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
                                More
                            </Button>
                    }
                </div>

            </div>
        );
    }
}

export default App;

