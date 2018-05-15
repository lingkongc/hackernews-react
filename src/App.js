import React, {Component} from 'react';
import './App.css';

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


// 高阶函数 传递给过滤器一个函数，该函数需要返回一个boolean值
const isSearched = searchTerm => item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase());

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
            <div className="app">
                <form>
                    <input type="text" onChange={this.onSearchChange}/>
                </form>

                {/*这里箭头函数使用了简洁体*/}
                {list.filter(isSearched(searchTerm)).map(item =>
                    <div key={item.objectID}>
                        <span>
                            <a href={item.url}>{item.title}</a>
                        </span>
                        <span>{item.author}</span>
                        <span>{item.num_comments}</span>
                        <span>{item.points}</span>
                        {/*删除按钮
                           这里的传入事件的匿名函数被称为高阶函数
                           倘若直接向onclick传入一个函数名，则无法向该函数传入参数
                           如果直接向onclick传入一个带有参数的函数，那么该函数会在页面加载后立即执行
                           因此向onclick传入一个匿名函数
                           这里涉及到性能问题，每次执行render的时候会实例化一个高阶函数
                        */}
                        <span>
                            <button
                                onClick={() => this.onDismiss(item.objectID)}
                                type="button"
                            >
                                Dismiss
                            </button>
                        </span>
                    </div>
                )}
            </div>
        );
    }
}

export default App;
