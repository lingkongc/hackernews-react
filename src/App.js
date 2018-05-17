import React, {Component} from 'react';
import './App.css';

import Table from './Table';
import Search from './Search';


const DEFAULT_QUERY = 'redux';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';


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
        this.onSearchSubmit=this.onSearchSubmit.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    setSearchTopStories(result) {
        this.setState({result});
    }

    fetchSearchTopStories(searchTerm) {
        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
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

    onSearchSubmit(event){
        const {searchTerm}=this.state;
        this.fetchSearchTopStories(searchTerm);
        event.preventDefault();
    }


    render() {
        // 解构 相当于searchTerm=this.state.serchTerm... 对于数组变量对象都适用
        const {searchTerm, result} = this.state;
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


            </div>
        );
    }
}

export default App;
