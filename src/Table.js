import React, {Component} from 'react';
import './App.css';


// 高阶函数 传递给过滤器一个函数，该函数需要返回一个boolean值
const isSearched = searchTerm => item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase());

class Table extends Component {

    render() {
        const {list, pattern, onDismiss} = this.props;
        return (
            <div>
                {/*这里箭头函数使用了简洁体*/}
                {list.filter(isSearched(pattern)).map(item =>
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
                                onClick={() => onDismiss(item.objectID)}
                                type="button"
                            >
                                Dismiss
                            </button>
                        </span>
                    </div>
                )}
            </div>
        )
    }
}


export default Table;