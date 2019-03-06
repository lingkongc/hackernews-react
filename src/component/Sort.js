import React from 'react';
import classNames from 'classnames';
import Button from "./Button/Button";

const Sort = ({
                  sortKey,
                  onSort,
                  children,
                  activeSortKey
              }) => {

    // 利用数组来动态添加类 好吧作者也角色这样很蠢
    // const sortClass = ['button-inline'];
    // if (sortKey === activeSortKey) {
    //     sortClass.push('button-active');
    // }

    const sortClass = classNames(
        'button-inline',
        {'button-active': sortKey === activeSortKey}
    )

    return (
        <Button
            onClick={() => onSort(sortKey)}
            className={sortClass}
        >
            {children}
        </Button>
    )
}

export default Sort;