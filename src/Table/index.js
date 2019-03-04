import React, {Component} from 'react';
import Button from '../Button';
import Sort from '../Sort';
import PropTypes from 'prop-types';
import {sortBy} from "lodash";

import './style.css';

// 高阶函数 传递给过滤器一个函数，该函数需要返回一个boolean值
// const isSearched = searchTerm => item =>
//     item.title.toLowerCase().includes(searchTerm.toLowerCase());

// 传入一个列表，返回一个排序后的新列表
const SORTS = {
    NONE: list => list,
    TITLE: list => sortBy(list, 'tilte'),
    AUTHOR: list => sortBy(list, 'author'),
    COMMENTS: list => sortBy(list, 'num_comments').reverse(),
    POINTS: list => sortBy(list, 'points').reverse(),
};

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortKey: 'NONE',
            isSortReverse: false,
        };

        this.onSort = this.onSort.bind(this);
    }

    onSort(sortKey) {
        // 如果skrtKey状态和传入的sortKey相同，并且反向状态并未设置为true，则反向状态设置为true
        const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
        this.setState({sortKey, isSortReverse});
    }

    render() {
        const {
            list,
            onDismiss,
        } = this.props;

        const {
            sortKey,
            isSortReverse,
        } = this.state;

        const sortedList = SORTS[sortKey](list);
        const reverseSortedList = isSortReverse
            ? sortedList.reverse()
            : sortedList;

        return (
            <div className="table">
                {/*这里箭头函数使用了简洁体*/}
                <div className="table-header">
                    <span className="largeColumn">
                        <Sort sortKey={'TITLE'}
                              onSort={this.onSort}
                              activeSortKey={sortKey}
                        >
                            Title
                        </Sort>
                    </span>
                    <span className="midColumn">
                        <Sort sortKey={'AUTHOR'}
                              onSort={this.onSort}
                              activeSortKey={sortKey}
                        >
                            Author
                        </Sort>
                    </span>
                    <span className="smallColumn">
                        <Sort sortKey={"COMMENTS"}
                              onSort={this.onSort}
                              activeSortKey={sortKey}
                        >
                            Comments
                        </Sort>
                    </span>
                    <span className="smallColumn">
                        <Sort sortKey={'POINTS'}
                              onSort={this.onSort}
                              activeSortKey={sortKey}
                        >
                            Points
                        </Sort>
                    </span>
                    <span className="smallColumn">
                        Archive
                    </span>
                </div>

                {reverseSortedList.map(item =>
                    <div key={item.objectID} className="table-row">
                        <span className="largeColumn">
                            <a href={item.url}>{item.title}</a>
                        </span>
                        <span className="midColumn">{item.author}</span>
                        <span className="smallColumn">{item.num_comments}</span>
                        <span className="smallColumn">{item.points}</span>
                        {/*删除按钮
                        这里的传入事件的匿名函数被称为高阶函数
                        倘若直接向onclick传入一个函数名，则无法向该函数传入参数
                        如果直接向onclick传入一个带有参数的函数，那么该函数会在页面加载后立即执行
                        因此向onclick传入一个匿名函数
                        这里涉及到性能问题，每次执行render的时候会实例化一个高阶函数
                        */}
                        <span className="smallColumn">
                            <Button onClick={() => onDismiss(item.objectID)}
                                    className=" button-inline"
                            >
                                Dismiss
                            </Button>
                        </span>
                    </div>
                )}
            </div>
        )
    }
}

export default Table;


Table.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            objectID: PropTypes.string.isRequired,
            author: PropTypes.string,
            url: PropTypes.string,
            num_comments: PropTypes.number,
            points: PropTypes.number,
        })
    ).isRequired,
    onDismiss: PropTypes.func,
};