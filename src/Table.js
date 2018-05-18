import React from 'react';
import Button from './Button';


// 高阶函数 传递给过滤器一个函数，该函数需要返回一个boolean值
// const isSearched = searchTerm => item =>
//     item.title.toLowerCase().includes(searchTerm.toLowerCase());

const largeColumn={
    width: '40%',
};

const midColumn={
    width: '30%',
}

const smallColumn={
    width: '10%',
}

const Table = ({list,onDismiss}) =>
    <div className="table">
        {/*这里箭头函数使用了简洁体*/}
        <div className="table-header">
            <span style={largeColumn}>title</span>
            <span style={midColumn}>author</span>
            <span style={smallColumn}>Point</span>
            <span style={smallColumn}>comments</span>
            <span style={smallColumn}>delete</span>
        </div>
        {list.map(item =>
            <div key={item.objectID} className="table-row">
                <span style={largeColumn}>
                    <a href={item.url}>{item.title}</a>
                </span>
                <span style={midColumn}>{item.author}</span>
                <span style={smallColumn}>{item.num_comments}</span>
                <span style={smallColumn}>{item.points}</span>
                {/*删除按钮
                           这里的传入事件的匿名函数被称为高阶函数
                           倘若直接向onclick传入一个函数名，则无法向该函数传入参数
                           如果直接向onclick传入一个带有参数的函数，那么该函数会在页面加载后立即执行
                           因此向onclick传入一个匿名函数
                           这里涉及到性能问题，每次执行render的时候会实例化一个高阶函数
                        */}
                <span style={smallColumn}>
                    <Button onClick={() => onDismiss(item.objectID)}
                            className="button-inline"
                    >
                        Dismiss
                    </Button>
                </span>
            </div>
        )}
    </div>


export default Table;