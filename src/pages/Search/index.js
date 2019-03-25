import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import './index.css';

import Table from './components/Table';
import SearchInput from './components/SearchInput/';
import ButtonWithLoading from './components/Button/ButtonWithLoading';
import {
    PATH_BASE,
    PATH_SEARCH,
    PARAM_SEARCH,
    PARAM_PAGE,
    PARAM_HPP
} from "../../constants/API";

const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '50';

// 这是一个高阶组件
// setState() 可以接收一个函数，这个函数接受两个参数，第一个参数表示上一个状态值（prevState），第二参数表示当前的 props
// 这个函数返回一个新函数，作为setState的参数传入
const updateSearchTopStoriesState = (hits, page) => (prevState) => {
    const {searchKey, results} = prevState;

    const oldHits = results && results[searchKey]
        ? results[searchKey].hits  // 存在的话
        : [];

    // 将过去的项目和新的项目合并到新的数组
    const updatedHits = [
        ...oldHits,
        ...hits
    ];

    // 返回更新后的state对象
    return {
        // 将新的搜索合并到results，如果存在该对象，则覆盖
        results: {
            ...results,
            [searchKey]: {hits: updatedHits, page}
        },
        isLoading: false
    }
}

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            results: null,
            searchKey: '',
            searchTerm: DEFAULT_QUERY,
            error: null,
            isLoading: false,
        };

        this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this); // 发起重复请求，阻止
        this.setSearchTopStories = this.setSearchTopStories.bind(this); // 覆盖数据
        this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this); // 发送请求获取数据
        // 绑定到类方法
        // 使用bind()是为了将this绑定到类实例，，类方法不会自动绑定this到实例上。会无法调用state的。
        // 猜测  这些方法最后都会绑定到实例上，但是却需要从构造函数中访问state，因此需要将他们绑定回构造器
        this.onDismiss = this.onDismiss.bind(this); // 删除数据
        this.onSearchSubmit = this.onSearchSubmit.bind(this);   // 提交事件
        this.onSearchChange = this.onSearchChange.bind(this);   // 监听input
    }

    // 如果存在缓存的serachTerm 则返沪false
    needsToSearchTopStories(searchTerm) {
        return !this.state.results[searchTerm];
    }

    // 发送请求后设置result
    setSearchTopStories(result) {
        // result是返回的数据
        const {hits, page} = result;
        // hits=result.hits;
        // page=result.page;

        this.setState(updateSearchTopStoriesState(hits, page));
    }

    fetchSearchTopStories(searchTerm, page = 0) {
        this.setState({isLoading: true});
        axios.get(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
            .then(response => response.data)
            .then(result => this.setSearchTopStories(result))
            .catch(e => this.setState({error: e}));
    }

    // 组件加载完毕后，初始化searchKey，并发起请求
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

        this.setState({
            results: {
                ...results,
                [searchKey]: {hits: updatedHits, page}
            }
        })
    }

    onSearchChange(event) {
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
        if (error) {
            return <p>Something went wrong.</p>
        }

        return (
            <div className="page">
                <div className="interactions">
                    <SearchInput>Search</SearchInput>
                </div>
                {/* {
                    error
                        ? <div className="interactions">
                            <p>Something went wrong.</p>
                        </div>
                        : <Table
                            list={list}
                            onDismiss={this.onDismiss}
                        />
                }

                <div className="interactions">
                    <ButtonWithLoading
                        isLoading={isLoading}
                        onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
                        more
                    </ButtonWithLoading>
                </div> */}
            </div>
        );
    }
}

export default Search;

