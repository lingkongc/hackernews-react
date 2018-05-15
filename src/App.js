import React, {Component} from 'react';
import './App.css';

import Table from './Table';
import Search from './Search';

// 模拟数据
const list = [
    {
        title: 'React',
        url: 'https://facebook.github.io/react',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0,
    },
    {
        title: 'Redux',
        url: 'https://github.com/react.js/redux',
        author: 'Dan Abramov, Andrew Clark',
        num_comments: 2,
        points: 5,
        objectID: 1,
    },
];

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // 属性名与变量名一致的时候可以简写
            list,
            searchTerm: '',
        };

        // 绑定到类方法
        // 使用bind()是为了将this绑定到类实例，，类方法不会自动绑定this到实例上。会无法调用state的。
        this.onDismiss = this.onDismiss.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    // 方法初始化简写形式
    onDismiss(id) {
        console.log(this);
        // 结果为false
        const isNotId = item => item.objectID !== id;
        // filter函数遍历数字，传入函数，如果判断是true则保留, 最后返回结果数组，并不会改变原数组
        const updatedList = this.state.list.filter(isNotId);
        this.setState({list: updatedList});
    }

    onSearchChange(event) {
        // 这里可以访问到事件对象
        this.setState({
            searchTerm: event.target.value
        })
    }


    render() {
        // 解构 相当于searchTerm=this.state.serchTerm... 对于数组变量对象都适用
        const {searchTerm, list} = this.state;
        return (
            <div className="App">

                <Search
                    value={searchTerm}
                    onChange={this.onSearchChange}
                >Search</Search>

                <Table
                    list={list}
                    pattern={searchTerm}
                    onDismiss={this.onDismiss}
                />

            </div>
        );
    }
}

export default App;
